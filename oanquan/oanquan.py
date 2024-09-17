"""O An Quan game logic"""

import enum
import math
import random

import pydantic

BOARD_SIZE = 12
QUAN_FIELDS = [0, 6]
INITIAL_BOARD = [10, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5]
COMPUTER_FIELDS = [1, 2, 3, 4, 5]
PLAYER_FIELDS = [7, 8, 9, 10, 11]


class Player(enum.Enum):
    """Player of the game"""

    COMPUTER = True
    PLAYER = False


class Direction(enum.Enum):
    """Direction of the movement"""

    CLOCKWISE = 1
    COUNTER_CLOCKWISE = -1


class Move(pydantic.BaseModel):
    """Move of the game"""

    pos: int
    direction: Direction


class OAnQuan(pydantic.BaseModel):
    """O An Quan game"""

    board: list[int] = INITIAL_BOARD
    score: dict[str, int] = {Player.COMPUTER.name: 0, Player.PLAYER.name: 0}
    turn: bool = Player.COMPUTER.value
    end: bool = False
    allowed_moves: list[int] = COMPUTER_FIELDS

    @classmethod
    def start_game(cls):
        """Start a new game of O An Quan"""
        out = cls()
        out.turn = random.choice([Player.COMPUTER.value, Player.PLAYER.value])
        out.update_allowed_moves()
        return out

    def get_current_player(self) -> Player:
        """Get Player who's turn it is"""

        return Player(self.turn)

    def check_end(self) -> bool:
        """Check if the game has ended"""

        if sum(self.board[pos] for pos in QUAN_FIELDS) == 0:
            self.end = True
            self.score[Player.COMPUTER.name] += sum(
                self.board[: QUAN_FIELDS[1]]
            )
            self.score[Player.PLAYER.name] += sum(
                self.board[QUAN_FIELDS[1] + 1 :]
            )
            self.board = [0] * BOARD_SIZE
        return self.end

    def update_allowed_moves(self):
        """Get allowed moves for the current player"""
        fields = (
            COMPUTER_FIELDS
            if self.get_current_player() == Player.COMPUTER
            else PLAYER_FIELDS
        )
        allowed_moves = [pos for pos in fields if self.board[pos] > 0]
        if allowed_moves:
            self.allowed_moves = allowed_moves
            return
        self.score[self.get_current_player().name] -= len(fields)
        for pos in fields:
            self.board[pos] = 1
        self.allowed_moves = fields

    def get_winner(self) -> str:
        """Get the winner of the game"""

        if self.score[Player.COMPUTER.name] > self.score[Player.PLAYER.name]:
            return Player.COMPUTER.name
        if self.score[Player.COMPUTER.name] < self.score[Player.PLAYER.name]:
            return Player.PLAYER.name
        return "Draw"

    def make_move(self, move: Move):
        """Move the stones in the board"""

        def get_normalized_pos(pos: int) -> int:
            m = math.floor(pos / BOARD_SIZE)
            return pos - m * BOARD_SIZE

        pos, direction = move.pos, move.direction

        to_distribute = self.board[pos]
        self.board[pos] = 0

        for i in range(1, to_distribute + 1):
            index = get_normalized_pos(pos + i * direction.value)
            self.board[index] += 1

        index = get_normalized_pos(index + direction.value)
        if self.board[index] == 0:
            next_index = get_normalized_pos(index + direction.value)
            while (self.board[index] == 0) and (self.board[next_index] != 0):
                self.score[self.get_current_player().name] += self.board[
                    next_index
                ]
                self.board[next_index] = 0
                index = get_normalized_pos(next_index + direction.value)
                next_index = get_normalized_pos(index + direction.value)
            self.turn = not self.turn
            self.update_allowed_moves()
        elif index in QUAN_FIELDS:
            self.turn = not self.turn
            self.update_allowed_moves()
        else:
            self.make_move(Move(pos=index, direction=direction))
