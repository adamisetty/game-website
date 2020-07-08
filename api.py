from flask import Flask, jsonify, request
#from games.tictactoe import make_board
from games import tictactoe as tt

app = Flask('game_website')
responses = []

@app.route('/')
def home():
    return "Welcome!"

@app.route('/post', methods=['POST'])
def test():
    response = {
        'board' : tt.make_board()
    }
    responses.append(response)
    print('Called post')
    return jsonify({'response' : response}), 201


@app.route('/test', methods=['GET'])
def get():
    print('called Get')
    return jsonify({'responses': responses})

if __name__ == '__main__':
    app.run(debug=True)