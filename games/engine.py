from games import tictactoe
from games import matching
from games import hangman

# make_board = {'tictactoe' : tictactoe.make_board}
#
# turn = {'tictactoe' : tictactoe.place_mark}
#
# is_winner = {'tictactoe' : tictactoe.is_game_over}
#
# winner = {'tictactoe' : tictactoe.get_winner}
#
# current_player = {'tictactoe' : tictactoe.get_current_player}
#
# score = {'tictactoe' : tictactoe.get_score}

class Engine :

    def __init__(self) :
        self.name = ""
        self.game = ""

    def make_game(self, name):
        self.name = name
        if self.name == "tictactoe" :
            self.game = tictactoe.TicTacToe()
        if self.name == "matching" :
            self.game = matching.Matching()
        if self.name == "hangman" :
            self.game = hangman.Hangman()

    def turn(self, position):
        return self.game.place_mark(position)

    def winner(self):
        return self.game.get_winner()

    def is_winner(self):
        return self.game.is_game_over()

    def current_player(self):
        return self.game.get_current_player()

    def score(self):
        return self.game.get_score()

    def get_board(self):
        return self.game.get_board()

    def reset(self):
        if self.game == "" :
            return
        return self.game.reset()