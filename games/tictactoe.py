turn_count = 0

x_won = False

o_won = False

game_over = False

board = '_________'

SIDE_LEN = 3
BOARD_LEN = 9


def make_board():
    return board


def place_mark(position):
    if x_won or o_won:
        game_over = True
        return

    turn_count += 1

    if turn_count % 2 == 0:

        board[position] = 'X'

    else:

        board[position] = 'O'

    if turn_count > 5:
        checkGameOver()

    return board


def checkGameOver():
    for i in range(0, 9, 3):
        if check_horizontal_winner('X', i):
            x_won = True
        if check_horizontal_winner('O', i):
            o_won = True

    for i in range(3):
        if check_vertical_winner('X', i):
            x_won = True

        if check_vertical_winner('O', i):
            o_won = True

    if check_left_diagonal('X') or check_right_diagonal('X'):
        x_won = True

    if check_left_diagonal('O') or check_right_diagonal('O'):
        o_won = True


def check_horizontal_winner(player, start):
    for i in range(start, start + 3, 1):
        if board[i] != player:
            return false
    return true

def check_vertical_winner(player, start):
    for i in range(start, BOARD_LEN , SIDE_LEN):
        if board[i] != player:
            return false
    return true

def check_right_diagonal(player):
    for i in range(SIDE_LEN - 1, BOARD_LEN - SIDE_LEN, SIDE_LEN - 1):
        if board[i] != player:
            return false
    return true

def check_left_diagonal(player):
    for i in range(0, BOARD_LEN, SIDE_LEN + 1):
        if board[i] != player:
            return false
    return true

def is_game_over():
    return game_over

def get_winner():
    if game_over:
        if x_won:
            return 'X'
        elif o_won:
            return 'O'
        else:
            return 'No Winner'

def get_score():
    return turn_count