"""API for the O An Quan game."""

import enum
import os
import random
import typing as t

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from oanquan.alpha_beta import minimax
from oanquan.oanquan import Direction, Move, OAnQuan, Player

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Level(enum.Enum):
    """Level of the game"""

    EASY = "easy"
    NORMAL = "normal"
    HARD = "hard"


def get_move_func(level: Level) -> t.Callable[[OAnQuan], Move]:
    """Get the function to make a move based on the level."""
    if level == Level.EASY:
        return make_random_move
    if level == Level.NORMAL:
        func = random.choices(
            [make_random_move, make_ab_move], cum_weights=[0.6, 0.4]
        )[0]
        return func
    return make_ab_move


@app.get("/game/start/{level}")
def start_game(level: Level):
    """Start a new game of O An Quan."""
    game = OAnQuan.start_game()
    if game.get_current_player() == Player.COMPUTER:
        last_move = get_move_func(level)(game).model_dump()
    else:
        last_move = None

    hint = get_hint(game)
    return {
        "game": game.model_dump(),
        "hint": hint,
        "last_move": last_move,
    }


def make_random_move(game: OAnQuan) -> Move:
    """Make a random allowed move."""
    pos = random.choice(game.allowed_moves)
    direction = random.choice(
        [Direction.CLOCKWISE, Direction.COUNTER_CLOCKWISE]
    )
    move = Move(pos=pos, direction=direction)
    game.make_move(move)
    return move


def make_ab_move(game: OAnQuan) -> Move:
    """Make move based on alpha-beta pruning."""
    if move := minimax(game)[1]:
        game.make_move(move)
        return move
    return make_random_move(game)


@app.post("/game/hint")
def get_hint(game: OAnQuan) -> dict[str, t.Any]:
    """Get a hint for the next move."""
    if move := minimax(game, player=game.get_current_player())[1]:
        return move.model_dump()
    return make_random_move(game).model_dump()


@app.post("/game/move/{level}")
def make_move(game: OAnQuan, move: Move, level: Level):
    """Make a move and get the computer's response"""

    # Check if the player's move is valid
    if move.pos not in game.allowed_moves:
        raise HTTPException(status_code=400, detail="Invalid move position.")

    if game.end:
        raise HTTPException(status_code=400, detail="Game has ended.")

    try:
        # Make the player's move
        game.make_move(move)

        # Check if the game has ended after the player's move
        if game.check_end():
            return {
                "game": game.model_dump(),
                "winner": game.get_winner(),
            }

        last_move = get_move_func(level)(game).model_dump()

        # Check if the game has ended after the computer's move
        if game.check_end():
            return {
                "game": game.model_dump(),
                "winner": game.get_winner(),
                "last_move": last_move,
            }

        hint = get_hint(game)

        # Return the updated game state and the next turn
        return {
            "game": game.model_dump(),
            "hint": hint,
            "last_move": last_move,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
