"""Alpha-beta pruning algorithm for O An Quan game."""

from copy import deepcopy

from oanquan.oanquan import Direction, Move, OAnQuan, Player


def evaluate_position(game: OAnQuan, player: Player) -> float:
    """Evaluate a player's position in the game"""
    return game.score[player.name] - game.score[Player(not player.value).name]


def get_move_eval(game: OAnQuan, player: Player) -> float:
    """Get the evaluation of the current move."""
    eval = evaluate_position(game, player)
    return 100 * eval if game.check_end() else 2 * eval


def minimax(
    game: OAnQuan,
    depth: int = 5,
    maximizing: bool = True,
    alpha: float = float("-inf"),
    beta: float = float("inf"),
    player: Player = Player.COMPUTER,
) -> tuple[float, Move | None]:
    """Minimax algorithm with alpha-beta pruning."""
    if depth == 0 or game.check_end():
        return evaluate_position(game, player), None

    all_moves = [
        Move(pos=pos, direction=direction)
        for pos in game.allowed_moves
        for direction in [Direction.CLOCKWISE, Direction.COUNTER_CLOCKWISE]
    ]
    move_map: dict[float, Move] = {}
    if maximizing:
        max_eval = float("-inf")
        for move in all_moves:
            game_copy = deepcopy(game)
            game_copy.make_move(move)
            potential_eval, _ = minimax(
                game_copy, depth - 1, False, alpha, beta, player
            )
            move_eval = get_move_eval(game_copy, player)
            total_eval = move_eval + potential_eval
            move_map[total_eval] = move
            max_eval = max(max_eval, total_eval)
            alpha = max(alpha, total_eval)
            if beta <= alpha:
                break
        return max_eval, move_map[max_eval]
    else:
        min_eval = float("inf")
        for move in all_moves:
            game_copy = deepcopy(game)
            game_copy.make_move(move)
            potential_eval, _ = minimax(
                game_copy, depth - 1, True, alpha, beta, player
            )
            move_eval = get_move_eval(game_copy, player)
            total_eval = move_eval + potential_eval
            move_map[total_eval] = move
            min_eval = min(min_eval, total_eval)
            beta = min(beta, total_eval)
            if beta <= alpha:
                break
        return min_eval, move_map[min_eval]
