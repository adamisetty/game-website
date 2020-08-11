import random

class Hangman :

    def __init__(self) :
        self.game_over = False
        self.topic = ""
        self.answer = ""
        self.right_guess = []
        self.number_of_wrong_guesses = 0
        self.previous_wrong_guesses = ""
        self.choose_word()

    def choose_word(self) :
        topic_choices = ['sport', 'music', 'animal', 'fruits and vegetables']
        self.topic = random.choice(topic_choices)
        if self.topic == 'sport':
            self.choose_sport()
        elif self.topic == 'music':
            self.choose_music_genre()
        elif self.topic == 'animal':
            self.choose_animal()
        elif self.topic == 'fruits and vegetables':
            self.choose_fruit_vegetable()

        #self.right_guess = self.right_guess + ("_" * len(self.answer))
        for i in range(len(self.answer)) :
            self.right_guess.append("_ ")
        return self.right_guess

    def choose_sport(self) :
        sport_words = ['swimming', 'lacrosse', 'handball', 'gymnastics', 'cricket', 'wrestling', 'boxing', 'archery', 'badminton', 'curling']
        self.answer = random.choice(sport_words)
        print(self.answer)

    def choose_music_genre(self) :
        music_genre_words = ['reggae', 'country', 'funk', 'classical', 'instrumental', 'alternative', 'psychedelic', 'bluegrass', 'grunge', 'swing']
        self.answer = random.choice(music_genre_words)
        print(self.answer)

    def choose_animal(self) :
        animal_words = ['wombat', 'sloth', 'ferret', 'orangutan', 'leopard', 'rhinoceros', 'peacock', 'penguin', 'reindeer', 'gorilla']
        self.answer = random.choice(animal_words)
        print(self.answer)

    def choose_fruit_vegetable(self) :
        fruit_vegetable_words = ['asparagus', 'avacado', 'rutabaga', 'lemongrass', 'watercress', 'pomegranate', 'bamboo', 'kale', 'artichoke', 'grapefruit']
        self.answer = random.choice(fruit_vegetable_words)
        print(self.answer)

    # def choose_(self) :
    #      = ['', '', '', '', '', '', '', '', '', '']
    #     self.answer = random.choice()

    #function for guessing a letter
    def place_mark(self, letter) :
        if letter == 'start':
            return self.right_guess


        if self.game_over :
            return self.right_guess
        is_letter_right = False

        for i in range (len(self.answer)) :
            if letter == self.answer[i] :
                is_letter_right = True
                self.right_guess[i] = letter
        if not is_letter_right :
            self.previous_wrong_guesses = self.previous_wrong_guesses + letter
            self.number_of_wrong_guesses = self.number_of_wrong_guesses + 1

        return self.right_guess

    def check_game_over(self) :

        # for i in range (len(self.right_guess)) :
        #     if self.right_guess[i] == "_" :
        #         game_over = False
        # game_over = True

        is_player_correct = True
        for i in range (len(self.answer)) :
            if not self.right_guess[i] == self.answer[i] :
                is_player_correct = False

        if is_player_correct or self.number_of_wrong_guesses >= 6:
            self.game_over = True

    def is_game_over(self) :
        self.check_game_over()
        return self.game_over

    def get_score(self) :
        return self.number_of_wrong_guesses

    def get_winner(self) :
        return self.answer

    def get_current_player(self) :
        game_info = [self.topic, self.previous_wrong_guesses]
        return game_info

    def get_board(self) :
        return self.right_guess

    def reset(self) :
        self.game_over = False
        self.topic = ""
        self.answer = ""
        self.right_guess = ""
        self.number_of_wrong_guesses = 0
        self.previous_wrong_guesses = ""