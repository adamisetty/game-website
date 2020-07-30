import random

class Matching :

    def __init__(self):
        self.game_over = [False]
        self.current_matches = 0
        self.current_player = []
        self.hidden_board = ['Blimey!', 'Blimey!', 'Rubbish!', 'Rubbish!', 'Minging!' 'Minging!', 'Cheerio!', 'Cheerio!',
                      'Codswallop! ', 'Codswallop!', 'Gutted', 'Gutted', 'Bobs Your Uncle!', 'Bobs Your Uncle!',
                      'Brilliant!', 'Brilliant!'] # 16 spaces
        self.blank_board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        self.TOTAL_MATCHES = 8

    def get_board(self):
        random.shuffle(self.hidden_board) # Shuffles words for new game
        return self.hidden_board

    # Makes a turn, first_pos and second_pos are player's first and second guesses
    def place_mark(self, first_pos, second_pos):
        self.check_game_over()
        first_pos = int(first_pos)
        second_pos = int(second_pos)
        blank_board[first_pos] = hidden_board[first_pos]
        blank_board[second_pos] = hidden_board[second_pos]
        self.check_same_word(first_pos, second_pos)

    def check_game_over(self):
        if self.current_matches == self.TOTAL_MATCHES:
            self.game_over = [True]

    def check_same_word(self, first_pos, second_pos):
        if self.hidden_board[first_pos] == self.hidden_board[second_pos]:
            self.current_matches += 1
            self.blank_board[first_pos] = 'X' # Marks square as a found match
            self.blank_board[second_pos] = 'X'
        else:
            self.blank_board = ' ' # Hides the word
            self.blank_board = ' '

   def is_game_over(self):
       return self.game_over[0]

   def get_winner(self):
       if self.game_over:
           return "You won!"

   def get_current_player(self):
       return self.current_player[0]

   def get_score(self):
       return self.current_matches

   def reset(self):
       self.game_over = [False]
       self.current_matches = 0
       self.current_player = []
       self.hidden_board = ['Blimey!', 'Blimey!', 'Rubbish!', 'Rubbish!', 'Minging!' 'Minging!', 'Cheerio!', 'Cheerio!',
                            'Codswallop! ', 'Codswallop!', 'Gutted', 'Gutted', 'Bobs Your Uncle!', 'Bobs Your Uncle!',
                            'Brilliant!', 'Brilliant!']  # 16 spaces
       self.blank_board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
       self.TOTAL_MATCHES = 8
