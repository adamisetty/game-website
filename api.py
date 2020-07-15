from flask import Flask, jsonify, request
from games import engine

app = Flask('game_website')
games_data = []

@app.route('/')
def home():
    return "Welcome!"

@app.route('/<game>/create', methods=['POST'])
def create_game(game):
    games_data.clear
    name = game
    response = {
        'game' : name,
        'board' : engine.make_board[name](),
        'isWinner' : engine.is_winner[name](),
        'winner' : engine.winner[name](),
        'current-player' : engine.current_player[name](),
        'score' : engine.score[name]()
    }
    games_data.append(response)
    return jsonify({'games_data' : games_data}), 201


@app.route('/<game>/get_data', methods=['GET'])
def get_data(game):
    return jsonify({'games_data': games_data})


@app.route('/<game>/<position>/make_turn', methods=['PUT'])
def make_turn(game, position=0):
    name = games_data[0]['game'] 
    games_data[0]['board'] = engine.turn[name](position)
    games_data[0]['isWinner'] = engine.is_winner[name]()
    games_data[0]['winner'] = engine.winner[name]()
    games_data[0]['score'] = engine.score[name]()
    return jsonify({'games_data' : games_data})

if __name__ == '__main__':
    app.run(debug=True)