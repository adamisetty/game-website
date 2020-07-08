turn_count = 0

x_won = False

o_won = True

board = '_________'


def make_board():
    return board


def place_mark(position):
    turn_count += 1

    if (count % 2 == 0):

        board[position] = 'X'

    else:

        board[position] = 'O'

    if (turn_count > 5):
        checkGameOver()


def checkGameOver():
    for i in range(0, 9, 3):
        checkHorizontalWinner('X', i)
        checkHorizontalWinner('O', i)

    for i in range(3):
        checkVerticalWinner('X', i)
        checkVerticalWinner('O', i)

    checkLeftDiagonal('X')

    checkLeftDiagonal('O')

    checkRightDiagonal('X')

    checkRightDiagonal('O')


def checkHorizontalWinner(player, start):
    for i in range(start, start + 3, 1):
        pass
        #if (board[i])
#def checkVerticalWinner(player, start);


#def checkRightDiagonal(player):


#def checkLeftDiagonal(player):