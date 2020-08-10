#from nltk.corpus import words as nltk_words
import nltk
from PyDictionary import PyDictionary
import random
import time

class Anagrams:

    def __init__(self):
        self.score = 0
        self.previous_words = []
        self.dictionary = PyDictionary()
        self.english_vocab = set(w.lower() for w in nltk.corpus.words.words())
        self.letters = []
        self.status = 0
        self.curr_word = ''
        self.SCORE_MAP = {0: 0, 3: 100, 4: 400, 5: 1200, 6:2000}
        self.START_TIME = time.time()
        self.create_board()
    
    def create_board(self):
        # either 2 or 3 vowels in each game
        if random.choice([True, False]):
            vowel_num = 2
        else: 
            vowel_num = 3
        commons = 'rstlnd'
        vowels = 'aeiou'
        consonants = 'bcdfghjklmnprstvwxyz'
        letter_count = 0
        while letter_count < vowel_num:
            self.letters.append(random.choice(vowels))
            letter_count = letter_count + 1
        while letter_count < 6:
            self.letters.append(random.choice(consonants))
            letter_count = letter_count + 1
        return 
    
    def place_mark(self, word):
        #self.curr_word = word
        if word in self.previous_words:
            self.status = 2
            return self.letters 
        elif len(word) <= 2 or len(word) > 6:
            self.status = 0
            return self.letters
        elif self.dictionary.meaning(word) == None:
            self.calc_score(0)
            self.status = 0
        elif word in self.english_vocab:
            self.previous_words.append(word)
            self.calc_score(len(word))
            self.status = 1
        else:
            self.previous_words.append(word)
            self.calc_score(len(word))
            self.status = 1
        return self.letters

    def calc_score(self, length):
        # will have len = 0, if invalid word
        self.score = self.score + self.SCORE_MAP[length]   

    def get_current_player(self):
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

    def get_winner(self):
        return self.previous_words

    def convert(self, char_list):
        # converts char array into a string
        return (''.join(char_list))
    