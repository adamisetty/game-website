from flask import Flask, jsonify

app = Flask('game_website')

@app.route('/')
def home():
    return "Welcome!"

@app.route('/post', methods=['GET'])
def post():
    return "We should return some sort of JSON here"


if __name__ == '__main__':
    app.run()
    #app.run(debug=True)