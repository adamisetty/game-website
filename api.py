from flask import Flask, jsonify, request
#from games.tictactoe import make_board
from games import tictactoe as tt

app = Flask('game_website')
responses = []

@app.route('/')
def home():
    return "Welcome!"

@app.route('/create', methods=['POST'])
#add parameter for which game later
def create_game():
    response = {
        'board' : tt.make_board()
    }
    responses.append(response)
    return jsonify({'response' : response}), 201


@app.route('/test', methods=['GET'])
def get():
    return jsonify({'responses': responses})

if __name__ == '__main__':
    app.run(debug=True)