import time
import random
import math

class BullsAndCows :


    def __init__(self):
        self.secret_code = self.generate_secret_code()
        self.SECRETCODELEN = 4
        self.board = []
        self.winner = None 
        self.isWinner = False
        self.current_player = None
        self.initial_time = time.time()
        self.final_time = time.time()
        self.score = 0


    def generate_secret_code(self) :
        code = ""
        num = ""
        for i in range(self.SECRETCODELEN) :
            while (str(num) in code) :
                num = random.randint(0,9)
            code = code + str(num)
        return code


    def has_duplicates(self, string) :
        for i in range(self.SECRETCODELEN) :
            for j in range(self.SECRETCODELEN) :
                if string[i] == string[j] and i != j :
                    return True
        return False

    
    def count_bulls(self, string) :
        bulls = 0
        for i in range(self.SECRETCODELEN) :
            if string[i] == self.secret_code[i] :
                bulls += 1
        return bulls


    def count_cows(self, string) :
        cows = 0
        for i in range(self.SECRETCODELEN) :
            for j in range(self.SECRETCODELEN) :
                if string [i] == self.secret_code[j] and i != j:
                    cows += 1
        return cows


    def place_mark(self, guess) :
        turn_list = []
        bulls = 0
        cows = 0
        if len(guess) != self.SECRETCODELEN :
            turn_list.append("Invalid Guess")
        elif self.has_duplicates(guess) :
            turn_list.append("Duplicates Present")
        else :
            bulls = self.count_bulls(guess)
            cows = self.count_cows(guess)
            turn_list.append(guess)
            turn_list.append(str(bulls))
            turn_list.append(str(cows))
        self.board.append(turn_list)
        return self.board

    
    def get_winner(self) :
        return self.winner

    
    def is_game_over(self) :
        return self.isWinner


    def get_current_player(self) :
        return self.current_player

    
    def get_score(self) :
        return math.floor(self.final_time - self.initial_time)


    def reset(self) :
        self.secret_code = self.generate_secret_code()
        self.SECRETCODELEN = 4
        self.board = []
        self.winner = None 
        self.isWinner = False
        self.current_player = None
        self.initial_time = time.time()
        self.score = 0