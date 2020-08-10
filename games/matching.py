import random

class Matching:
    def __init__(self):
        self.game_over = False
        self.current_player = None
        self.current_matches = 0
        self.strikes = 0
        self.old_positions = []
        self.chosen_positions = [0, 0]
        self.first_pos = 0
        self.second_pos = 0
        self.original_board = ['Blimey!', 'Blimey!', 'Rubbish!', 'Rubbish!', 'Minging!', 'Minging!', 'Cheerio!',
                             'Cheerio!',
                             'Codswallop! ', 'Codswallop!', 'Gutted', 'Gutted', 'Bobs Your Uncle!', 'Bobs Your Uncle!',
                             'Brilliant!', 'Brilliant!']  # 16 spaces
        self.blank_board = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
        self.TOTAL_MATCHES = 8
        self.hidden_board = random.sample(self.original_board, len(self.original_board)) # Shuffles words for new game
        print(self.hidden_board)

    # Makes a turn, first_pos and second_pos are player's first and second guesses
    def place_mark(self, positions):
        self.check_game_over()
        chosen_positions = positions.split("-")
        self.first_pos = int(chosen_positions[0])
        self.second_pos = int(chosen_positions[1])

        # Checks if words have already been matched
        for i in range(len(self.old_positions)):
            if self.old_positions[i] == self.first_pos or self.old_positions[i] == self.second_pos:
                return self.blank_board

        # Checks if the chosen words are the same
        if self.hidden_board[self.first_pos] == self.hidden_board[self.second_pos]:
            self.current_matches += 1
            self.blank_board[self.first_pos] = 'X'  # Marks square as a found match
            self.blank_board[self.second_pos] = 'X'
            self.old_positions.append(self.first_pos)
            self.old_positions.append(self.second_pos)
        else:
            self.strikes += 1
            self.blank_board[self.first_pos] = "-"  # Hides the word
            self.blank_board[self.second_pos] = "-"
        return self.blank_board

    def check_game_over(self):
        if self.current_matches == self.TOTAL_MATCHES:
            self.game_over = True

    def is_game_over(self):
        return self.game_over

    def get_winner(self):
        return self.hidden_board

    def get_current_player(self):
        return self.current_player

    def get_score(self):
        return self.current_matches

    def get_board(self):
        return self.blank_board

    def reset(self):
        self.game_over = False
        self.current_matches = 0
        self.current_player = None
        self.chosen_positions = []
        self.original_board = ['Blimey!', 'Blimey!', 'Rubbish!', 'Rubbish!', 'Minging!', 'Minging!', 'Cheerio!',
                               'Cheerio!',
                               'Codswallop!', 'Codswallop!', 'Gutted', 'Gutted', 'Bobs Your Uncle!',
                               'Bobs Your Uncle!',
                               'Brilliant!', 'Brilliant!']  # 16 spaces
        self.blank_board = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
        self.TOTAL_MATCHES = 8
        self.hidden_board = random.sample(self.original_board, len(self.original_board))  # Shuffles words for new game
        print(self.hidden_board)
