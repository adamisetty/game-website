from flask import Flask, jsonify, request
from games import engine

app = Flask('game_website')
games_data = []

@app.route('/')
def home():
    return "Welcome!"

@app.route('/create', methods=['POST'])
#add parameter for which game later
def create_game():
    games_data.clear
    name = 'tictactoe' #game #request.args.get('name')
    response = {
        'game' : name,
        'board' : engine.make_board[name](),
        'isWinner' : engine.is_winner[name](),
        'winner' : engine.winner[name](),
        'score' : engine.score[name]()
    }
    games_data.append(response)
    return jsonify({'games_data' : games_data}), 201


@app.route('/get_board', methods=['GET'])
def get():
    return jsonify({'games_data': games_data})


@app.route('/<game>/<position>/make_turn', methods=['PUT'])
def turn(game, position=0):
    name = games_data[0]['game'] #request.args.get('name')
    games_data[0]['board'] = engine.turn[name](position)
    games_data[0]['isWinner'] = engine.is_winner[name]()
    games_data[0]['winner'] = engine.winner[game]()
    games_data[0]['score'] = engine.score[game]()
    return jsonify({'games_data' : games_data})

if __name__ == '__main__':
    app.run(debug=True)