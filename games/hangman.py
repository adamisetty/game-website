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
        if topic == 'sport':
            self.choose_sport()
            elif topic == 'music':
                self.choose_music()
            elif topic == 'animal':
                self.choose_animal()
            elif topic == 'fruit':
                self.choose_fruit_vegetable()
            #elif topic ==         

        self.right_guess = self.right_guess + ("_" * len(self.answer))
        return self.word

    def choose_sport(self) :
        sport_words = ['swimming', 'lacrosse', 'handball', 'gymnastics', 'cricket', 'wrestling', 'boxing', 'archery', 'badminton', 'curling']
        self.answer = random.choice(sport_words)

    def choose_music_genre(self) :
        music_genre_words = ['reggae', 'country', 'funk', 'classical', 'instrumental', 'alternative', 'psychedelic', 'bluegrass', 'grunge', 'swing']
        self.answer = random.choice(music_genre_words)
    
    def choose_animal(self) :
        animal_words = ['wombat', 'sloth', 'ferret', 'orangutan', 'leopard', 'rhinoceros', 'peacock', 'penguin', 'reindeer', 'gorilla']
        self.answer = random.choice(animal_words)

    def choose_fruit_vegetable(self) :
        fruit_vegetable_words = ['asparagus', 'avacado', 'rutabaga', 'lemongrass', 'watercress', 'pomegranate', 'bamboo', 'turmeric', 'artichoke', 'grapefruit']
        self.answer = random.choice(fruit_vegetable_words)

    # def choose_(self) :
    #      = ['', '', '', '', '', '', '', '', '', '']
    #     self.answer = random.choice()    

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




