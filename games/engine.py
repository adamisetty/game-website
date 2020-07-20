from games import tictactoe

make_board = {'tictactoe' : tictactoe.make_board}

turn = {'tictactoe' : tictactoe.place_mark}

is_winner = {'tictactoe' : tictactoe.is_game_over}

winner = {'tictactoe' : tictactoe.get_winner}

current_player = {'tictactoe' : tictactoe.get_current_player}

score = {'tictactoe' : tictactoe.get_score}
