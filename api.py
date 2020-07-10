from flask import Flask, jsonify, request
#from games.tictactoe import make_board
from games import tictactoe as tt

app = Flask('game_website')
games_data = []

@app.route('/')
def home():
    return "Welcome!"

@app.route('/<game>/create', methods=['POST'])
#add parameter for which game later
def create_game():
    response = {
        'game' : request.args.get('name'),
        'board' : tt.make_board(),
        'isWinner' : False,
        'winner' : None,
        'score' : 0
    }
    games_data.append(response)
    return jsonify({'games_data' : games_data}), 201


@app.route('/<game>/get-board', methods=['GET'])
def get():
    return jsonify({'games_data': games_data})

@app.rout('/<game>/make-turn', methods=['PUT'])
def turn():
    games_data[0]['board'] = tt.make_move()
    return jsonify({'games_data' : games_data})

if __name__ == '__main__':
    app.run(debug=True)