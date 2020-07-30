import random

class Matching :

    def __init__(self):
        self.match_found = [False]
        self.game_over = [False]
        self.current_matches = 0
        self.current_player = []
        self.board = ['Blimey!', 'Blimey!', 'Rubbish!', 'Rubbish!', 'Minging!' 'Minging!', 'Cheerio!', 'Cheerio!',
                      'Codswallop! ', 'Codswallop!', 'Gutted', 'Gutted', 'Bobs Your Uncle!', 'Bobs Your Uncle!',
                      'Brilliant!', 'Brilliant!'] # 16 spaces
        self.old_words = []
        self.TOTAL_MATCHES = 8

    def get_board(self):
        random.shuffle(self.board) # Shuffles board for new game
        return self.board

    def is_game_over(self):
        if self.current_matches == self.TOTAL_MATCHES:
            self.game_over = [True]

    def check_same_word(self, first_pos, second_pos):
        if self.board[first_pos] == self.board[second_pos]:
            self.match_found = [True]
            self.current_matches += 1
            self.board[first_pos] = '-'
            self.board[second_pos] = '-'
            self.match_found = [False]

   def get_current_player(self):
       return self.current_player[0]

   def get_score(self):
       return self.current_matches

   def reset(self):
       self.match_found = [False]
       self.game_over = [False]
       self.current_matches = 0
       self.board = ['Blimey!', 'Blimey!', 'Rubbish!', 'Rubbish!', 'Minging!' 'Minging!', 'Cheerio!', 'Cheerio!',
                      'Codswallop! ', 'Codswallop!', 'Gutted', 'Gutted', 'Bobs Your Uncle!', 'Bobs Your Uncle!',
                      'Brilliant!', 'Brilliant!']  # 16 spaces
       self.old_words = []
       self.TOTAL_MATCHES = 8
       return