class TicTacToe :


    def __init__(self):
        self.turn_count = [0]
        self.x_won = [False]
        self.o_won = [False]
        self.game_over = [False]
        self.current_player = ['X']
        self.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        self.SIDE_LEN = 3
        self.BOARD_LEN = 9

    def place_mark(self, position):
        position = int(position)

        if self.board[position] == 'X' or self.board[position] == 'O' or self.game_over[0]:
            return self.board

        if self.turn_count[0] % 2 == 0:
            self.current_player[0] = 'X'
            self.board[position] = 'X'

        else:
            self.current_player[0] = 'O'
            self.board[position] = 'O'

        self.checkGameOver()

        self.turn_count[0] = self.turn_count[0] + 1

        return self.board


    def checkGameOver(self):
        for i in range(0, 9, 3):
            if self.check_horizontal_winner('X', i):
                self.x_won[0] = True
            if self.check_horizontal_winner('O', i):
                self.o_won[0] = True

        for i in range(3):
            if self.check_vertical_winner('X', i):
                self.x_won[0] = True

            if self.check_vertical_winner('O', i):
                self.o_won[0] = True

        if self.check_left_diagonal('X') or self.check_right_diagonal('X'):
            self.x_won[0] = True

        if self.check_left_diagonal('O') or self.check_right_diagonal('O'):
            self.o_won[0] = True
        if self.x_won[0] or self.o_won[0]:
            self.game_over[0] = True


    def check_horizontal_winner(self, player, start):
        for i in range(start, start + 3, 1):
            if self.board[i] != player:
                return False
        return True

    def check_vertical_winner(self, player, start):
        for i in range(start, self.BOARD_LEN , self.SIDE_LEN):
            if self.board[i] != player:
                return False
        return True

    def check_right_diagonal(self, player):
        values = [2, 4, 6]
        for i in values:
            if self.board[i] != player:
                return False
        return True

    def check_left_diagonal(self, player):
        values = [0, 4, 8]
        for i in values:
            if self.board[i] != player:
                return False
        return True

    def is_game_over(self):
        return self.game_over[0]

    def get_winner(self):
        if self.game_over[0]:
            if self.x_won[0]:
                return 'X'
            elif self.o_won[0]:
                return 'O'
            else:
                return 'No Winner'

    def get_score(self):
        return self.turn_count[0]

    def get_current_player(self):
        return self.current_player[0]

    def get_board(self):
        return self.board

    def reset(self):
        self.turn_count = [0]
        self.x_won = [False]
        self.o_won = [False]
        self.game_over = [False]
        self.current_player = ['X']
        self.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        return