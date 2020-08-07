import React from 'react';
import './hangman.css';
import API from './api.js';

import image_0 from "./hangman_images/hangman_0.png"
import image_1 from "./hangman_images/hangman_1.png"
import image_2 from "./hangman_images/hangman_2.png"
import image_3 from "./hangman_images/hangman_3.png"
import image_4 from "./hangman_images/hangman_4.png"
import image_5 from "./hangman_images/hangman_5.png"
import image_6 from "./hangman_images/hangman_6.png"

const flaskApiUrl = "http://127.0.0.1:5000";


class Letter extends React.Component {
    render() {
        return (
            <button
                className="letters"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>    
        )
    }
}

class HangmanBoard extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            letters: Array(26).fill(null),
            images: [image_0, image_1, image_2, image_3, image_4, image_5, image_6]
        };

        this.myAPI = new API({url: flaskApiUrl});
        this.myAPI.createEntity({name: 'hangman'});
        this.myAPI.endpoints.hangman.create_game({game: 'hangman'});
        this.topic = " ";
        this.guesses = " ";
        this.previous_wrong_guesses = " ";
        this.number_of_wrong_guesses = 0;
    }

    async handleClick(i) {
        try {
          var game_data = await this.myAPI.endpoints.hangman.make_turn({game: 'hangman'}, {position: i});
          console.log(typeof (game_data.data["games_data"][0]["board"]));
          const letters = this.state.letters.slice();
          if (i == 'start') {
            this.topic = game_data.data["games_data"][0]["current-player"][0];
            this.guesses = game_data.data["games_data"][0]["board"];
          } else {
            this.guesses = game_data.data["games_data"][0]["board"];
            this.previous_wrong_guesses = game_data.data["games_data"][0]["current-player"][1];
            this.number_of_wrong_guesses = game_data.data["games_data"][0]["score"];
          }
          
          this.setState({letters: letters});
        } catch (error) {
          console.log("error");
        }
        
    }

    renderLetter(i) {
        return (
           <Letter value={i}
           onClick={() => this.handleClick(i)}
           /> 
           
        );
    }

    render() { 
        return (
            <div>
                <div className="title">
                <p> Hangman </p>
                </div>
                <div
                style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
                }}></div>
                <div className="image">
                    <img src={this.state.images[this.number_of_wrong_guesses]}></img>
                </div>
                <div className="topic">
                <p> topic: {this.topic} </p>
                </div>
                <div
                style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
                }}></div>

                <div className="guesses">
                <p> {this.guesses} </p>
                </div>
                <div
                style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
                }}></div>

                <div className="wrong_guesses">
                <p> previous guesses: {this.previous_wrong_guesses} </p>
                </div>
                <div
                style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
                }}></div>

                <div>
                    {this.renderLetter('start')}
                </div>
                <div className="letter-row">
                {this.renderLetter('a')}
                {this.renderLetter('b')}
                {this.renderLetter('c')}
                {this.renderLetter('d')}
                {this.renderLetter('e')}
                {this.renderLetter('f')}
                {this.renderLetter('g')}
                {this.renderLetter('h')}
                {this.renderLetter('i')}
                {this.renderLetter('j')}
                {this.renderLetter('k')}
                {this.renderLetter('l')}
                {this.renderLetter('m')}
                </div>
                <div className="letter-row">
                {this.renderLetter('n')}
                {this.renderLetter('o')}
                {this.renderLetter('p')}
                {this.renderLetter('q')}
                {this.renderLetter('r')}
                {this.renderLetter('s')}
                {this.renderLetter('t')}
                {this.renderLetter('u')}
                {this.renderLetter('v')}
                {this.renderLetter('w')}
                {this.renderLetter('x')}
                {this.renderLetter('y')}
                {this.renderLetter('z')}
                </div>
            </div>    
        )    
    }
}

export default HangmanBoard;