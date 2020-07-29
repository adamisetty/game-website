import random

class Hangman :

    def __init__(self) :
        self.turn_count = 0
        self.game_over = False
        self.answer = ""
        self.right_guess = ""
        self.number_of_wrong_guesses = 0
        self.previous_wrong_guesses = ""

    def choose_word(self, topic) :
        self.answer = "answer"
        self.right_guess = self.right_guess + ("_" * len(self.answer))
        return self.word

    def choose_sport(self) :
        sport_words = ['swimming', 'lacrosse', 'handball', 'gymnastics', 'cricket', 'wrestling', 'boxing', 'archery', 'badminton', 'curling']
        self.answer = random.choice(sport_words)

    def choose_music_genre(self) :
        music_genre_words = ['reggae', 'country', 'funk', 'classical', 'instrumental', 'alternative', 'psychedelic', 'bluegrass', 'grunge', 'swing']

    #function for guessing a letter
    def place_mark(self, letter) :
        if self.game_over :
            return self.right_guess

        for i in range (len(self.answer)) :
            if letter == self.answer[i] :
                self.right_guess = letter
            else:
                self.previous_wrong_guesses = self.previous_wrong_guesses + letter
                self.number_of_wrong_guesses = self.number_of_wrong_guesses + 1

        return self.right_guess        

    def check_game_over(self) :

        # for i in range (len(self.right_guess)) :
        #     if self.right_guess[i] == "_" :
        #         game_over = False
        # game_over = True

        if self.right_guess == self.answer or self.number_of_wrong_guesses >= 6:
            game_over = True


    def reset(self) :
        self.turn_count = 0
        self.game_over = False
        self.answer = ""
        self.right_guess = ""
        self.wrong_guesses = 0




