
turn_count = [0]
x_won = [False]
o_won = [False]
game_over = [False]
current_player = ['X']
board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

SIDE_LEN = 3
BOARD_LEN = 9

def make_board():
    return board

def place_mark(position):
    position = int(position)
    
    if board[position] == 'X' or board[position] == 'O' or game_over[0]:
        return board

    if turn_count[0] % 2 == 0:
        current_player[0] = 'X'
        board[position] = 'X'

    else:
        current_player[0] = 'O'
        board[position] = 'O'

    checkGameOver()

    turn_count[0] = turn_count[0] + 1

    return board


def checkGameOver():
    for i in range(0, 9, 3):
        if check_horizontal_winner('X', i):
            x_won[0] = True
        if check_horizontal_winner('O', i):
            o_won[0] = True

    for i in range(3):
        if check_vertical_winner('X', i):
            x_won[0] = True

        if check_vertical_winner('O', i):
            o_won[0] = True

    if check_left_diagonal('X') or check_right_diagonal('X'):
        x_won[0] = True

    if check_left_diagonal('O') or check_right_diagonal('O'):
        o_won[0] = True
    if x_won[0] or o_won[0]:
        game_over[0] = True


def check_horizontal_winner(player, start):
    for i in range(start, start + 3, 1):
        if board[i] != player:
            return False
    return True

def check_vertical_winner(player, start):
    for i in range(start, BOARD_LEN , SIDE_LEN):
        if board[i] != player:
            return False
    return True

def check_right_diagonal(player):
    for i in range(SIDE_LEN - 1, BOARD_LEN - SIDE_LEN, SIDE_LEN - 1):
        if board[i] != player:
            return False
    return True

def check_left_diagonal(player):
    for i in range(0, BOARD_LEN, SIDE_LEN + 1):
        if board[i] != player:
            return False
    return True

def is_game_over():
    return game_over[0]

def get_winner():
    if game_over[0]:
        if x_won[0]:
            return 'X'
        elif o_won[0]:
            return 'O'
        else:
            return 'No Winner'

def get_score():
    return turn_count[0]

def get_current_player():
    return current_player[0]