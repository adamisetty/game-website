import React from 'react';
import './hangman.css';
import API from './api.js';
import ReactDOM from 'react-dom';
import App from './App';

import image_0 from "./hangman_images/hangman_0.png"
import image_1 from "./hangman_images/hangman_1.png"
import image_2 from "./hangman_images/hangman_2.png"
import image_3 from "./hangman_images/hangman_3.png"
import image_4 from "./hangman_images/hangman_4.png"
import image_5 from "./hangman_images/hangman_5.png"
import image_6 from "./hangman_images/hangman_6.png"

const flaskApiUrl = "http://127.0.0.1:5000";

class HomeButton extends React.Component {
    render() {
        return (
        <button className='hangman-home'
            onClick={() => this.props.onClick()}>
                {'home'}
        </button>
        );
    }
}


class Letter extends React.Component {
    render() {
        return (
            <button
                className="hangman_letters"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>    
        )
    }
}

class HangmanBoard extends React.Component {

    constructor(props) {
        console.log('start of constuctor');
        super(props);
        this.state = {
            letters: Array(26).fill(null),
            images: [image_0, image_1, image_2, image_3, image_4, image_5, image_6]
        };
    }

    componentDidMount() {
        this.myAPI = new API({url: flaskApiUrl});
        this.myAPI.createEntity({name: 'hangman'});
        this.myAPI.endpoints.hangman.create_game({game: 'hangman'});
        console.log('created hangman');
        this.topic = " ";
        this.guesses = " ";
        this.previous_wrong_guesses = " ";
        this.number_of_wrong_guesses = 0;
        this.is_game_over = false;
        this.correct_answer = " ";
    }

    async handleHomeClick() {
        await this.myAPI.endpoints.hangman.delete({game:'hangman'});
        ReactDOM.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>,
            document.getElementById('root')
          );
    }

    renderHomeButton() {
        return (
            <HomeButton
                onClick={() => this.handleHomeClick()}
            />
        );
    }

    async handleClick(i) {
        try {
          var game_data = await this.myAPI.endpoints.hangman.make_turn({game: 'hangman'}, {position: i});
          const letters = this.state.letters.slice();
          if (i == 'start') {
            this.topic = game_data.data["games_data"][0]["current-player"][0];
            this.guesses = game_data.data["games_data"][0]["board"];
          } else {
            this.guesses = game_data.data["games_data"][0]["board"];
            this.previous_wrong_guesses = game_data.data["games_data"][0]["current-player"][1];
            this.number_of_wrong_guesses = game_data.data["games_data"][0]["score"];
            this.is_game_over = game_data.data["games_data"][0]["isWinner"];
            this.correct_answer = game_data.data["games_data"][0]["winner"];
            console.log(this.correct_answer);
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
        if (!this.is_game_over) {
            return (
                <div>
                    {console.log(this.state.number_of_wrong_guesses)}
                    <div>
                        {this.renderHomeButton()}
                    </div>
                    <div className="hangman_title">
                    <p> Hangman </p>
                    </div>
                    <div
                    style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                    }}></div>
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
                    <div className="image">
                        <img src={this.state.images[this.number_of_wrong_guesses]}></img>
                    </div>
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
            ); 
        } else if (this.number_of_wrong_guesses >= 6) {
            return (
                <div>
                    <div>
                        {this.renderHomeButton()}
                    </div>
                {console.log("in else statement")}
                <div className="game_over_info">
                <p>
                    you lost :( 
                </p>
                <p>
                    the answer was {this.correct_answer}
                </p>
                <div className="image">
                    <img src={this.state.images[6]}></img>
                </div>
                </div>
                </div>
            );
        } else {
            return (
                <div>
                <div className="image">
                    <img src={this.state.images[this.number_of_wrong_guesses]}></img>
                </div>
                <div className="game_over_info">
                <p>
                    great job! you won :)
                </p>
                </div>
                </div>
            )
        } 
    }
}

export default HangmanBoard;