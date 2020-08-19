from flask import Flask, jsonify, request
from games import engine
from flask_cors import CORS
import os

app = Flask('game_website', static_folder='.my-app/build', static_url_path='/')
this_engine = engine.Engine()
CORS(app)
games_data = []

@app.route('/')
def home():
    return app.send_static_file('index.html')
    #return "Welcome!"

@app.route('/<game>/create', methods=['POST'])
def create_game(game):
    print("clear data")
    #games_data.clear()
    this_engine.reset()
    this_engine.make_game(game)
    response = {
        'game' : game,
        'board' : this_engine.get_board(),
        'isWinner' : this_engine.is_winner(),
        'winner' : this_engine.winner(),
        'current-player' : this_engine.current_player(),
        'score' : this_engine.score()
    }
    games_data.append(response)
    return jsonify({'games_data' : games_data}), 201


@app.route('/<game>/get_data', methods=['GET'])
def get_data(game):
    return jsonify({'games_data': games_data})


@app.route('/<game>/<position>/make_turn', methods=['PUT'])
def make_turn(game, position='0'):
    print('position:', position)
    games_data[0]['board'] = this_engine.turn(position)
    games_data[0]['isWinner'] = this_engine.is_winner()
    games_data[0]['winner'] = this_engine.winner()
    games_data[0]['current-player'] = this_engine.current_player()
    games_data[0]['score'] = this_engine.score()
    return jsonify({'games_data' : games_data})

@app.route('/<game>/delete_data', methods=['DELETE'])
def delete_data(game):
    del games_data[0]
    return 

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))