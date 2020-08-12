from PyDictionary import PyDictionary
from textblob import Word as WordDict
import random
import time

class Anagrams:

    def __init__(self):
        print("start of constructor")
        self.score = 0
        self.previous_words = []
        self.dictionary = PyDictionary()
        self.letters = []
        self.status = 0
        self.curr_word = ''
        self.SCORE_MAP = {0: 0, 3: 100, 4: 400, 5: 1200, 6:2000}
        self.START_TIME = time.time()
        self.create_board()
        print('end of constructor')
    
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
        self.letters.append(random.choice(commons))
        while len(self.letters) < vowel_num:
            letter = random.choice(vowels)
            if letter in self.letters:
                temp_l = self.letters.copy()
                temp_l.remove(letter)
                if not (letter in temp_l):
                    self.letters.append(letter)
                    letter_count = letter_count + 1
            else:
                self.letters.append(letter)
                letter_count = letter_count + 1
        while len(self.letters) < 6:
            letter = random.choice(consonants)
            if letter in self.letters:
                temp_l = self.letters
                temp_l.remove(letter)
                if not (letter in temp_l):
                    self.letters.append(letter)
                    letter_count = letter_count + 1
            else:
                self.letters.append(letter)
                letter_count = letter_count + 1
        return 
    
    def place_mark(self, word):
        if word in self.previous_words:
            self.status = 2
            return self.letters 
        elif len(word) <= 2 or len(word) > 6:
            self.status = 0
            return self.letters
        elif not (self.dictionary.meaning(word) == None):
            self.previous_words.append(word)
            self.calc_score(len(word))
            self.status = 1
        else:
            w = WordDict(word)
            check = w.spellcheck()
            if (check[0][1] == 1.0) and (word == check[0][0]):
                self.previous_words.append(word)
                self.calc_score(len(word))
                self.status = 1
            else:
                self.calc_score(0)
                self.status = 0
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
    