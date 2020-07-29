from nltk.corpus import words as nltk_words
import random
import time

class Anagrams:

    def __init__(self):
        self.score = 0
        self.previous_words = []
        self.dictionary = dict.fromkeys(nltk_words.words(), None)
        self.letters = []
        self.status = 0
        self.curr_word = ''
        self.SCORE_MAP = {0: 0, 3: 100, 4: 400, 5: 1200, 6:2000}
        self.START_TIME = time.time()
    
    def create_board(self):
        # either 2 or 3 vowels in each game
        if random.choice([True, False]):
            vowel_num = 2
        else: 
            vowel_num = 3
        vowels = 'aeiou'
        consonants = 'bcdfghjklmnpqrstvwxyz'
        letter_count = 0
        while letter_count < vowel_num:
            self.letters.append(random.choice(vowels))
            letter_count = letter_count + 1
        while letter_count < (6 - vowel_num):
            self.letters.append(random.choice(consonants))
            letter_count = letter_count + 1
        return 
    
    def check_word(self, word):
        word = self.curr_word
        if word in self.previous_words:
            self.status = 2
            return
        if len(word) <= 2 or len(word) > 6:
            self.status = 0
            return
        
        try:
            self.dictionary[word]
            self.previous_words.append(word)
            self.calc_score(len(word))
            self.status = 1
        except KeyError:
            self.calc_score(0)
            self.status = 0

    def calc_score(self, length):
        # will have len = 0, if invalid word
        self.score = self.score + self.SCORE_MAP[length]
        return self.score     

    def get_status(self):
        # used as get_player
        # 0 means the word was invalid
        # 1 means the word was unique and valid
        # 2 means the word was found previously
        return self.status
    
    def get_score(self):
        return self.score

    def get_board(self):
        return self.letters

    def is_game_over(self):
        curr_time = time.time()
        return (120 < curr_time - self.START_TIME)

    def reset(self):
        self.score = 0
        self.previous_words = []
        self.letters = []
        self.status = 0
        self.curr_word = ''
        self.START_TIME = time.time()

    def convert(self, char_list):
        # converts char array into a string
        return (''.join(char_list))
    