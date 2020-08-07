import React from 'react';
import './bullsandcows.css';
import API from './api.js';

const flaskApiUrl = "http://127.0.0.1:5000";

class GuessArea extends React.Component {
    render() {
        return (
            <button className="current-guess"
                    value=''>
                {this.props.value}
            </button>
        )
    }
}

class Number extends React.Component {
    render() {
        return (
          <button
            className="number"
            value=''
            onClick={() => this.props.onClick()}
          >
            {this.props.value}
          </button>
        );
      }
}

class Submit extends React.Component {
    render() {
        return (
            <button
                className="bullsandcows-submit"
                onClick={() => this.props.onClick()}
            >
                {'submit'}
            </button>
        )
    }
}

class Clear extends React.Component {
    render() {
        return (
            <button
                className="bullsandcows-submit"
                onClick={() => this.props.onClick()}
            >
                {'clear'}
            </button>
        )
    }
}

class BullsAndCowsBoard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            guess:''
        };
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'bullsandcows'});
    this.myAPI.endpoints.bullsandcows.create_game({game: 'bullsandcows'});
    }

    isDuplicates(num) {
        if (this.state.guess.length === 0) {
            return false;
        }
        for (let i = 0; i < this.state.guess.length; i++) {
            if (this.state.guess[i] === num) {
                return true;
            }
        }
        return false;
    }

    async handleNumberClick(num) { 
        var isDuplicate = this.isDuplicates(num);
        if ((this.state.guess.length < 4) && (!isDuplicate)) {
            this.state.guess = this.state.guess + num; 
        }
        var guess = this.state.guess;
        this.setState({guess: guess});
    }

    async handleSubmitClick() {
        var guess = this.state.guess;
        var game_data = await this.myAPI.endpoints.bullsandcows.make_turn({game: 'bullsandcows'}, {position: guess});
        this.setState({guess:''});
        console.log(game_data.data["games_data"][0]["winner"]);
        console.log(game_data.data["games_data"][0]["board"]);
    }

    async handleClearClick() {
        this.setState({guess: ''});
    }

    renderNumber(i) {
        return (
            <Number
                value = {i}
                onClick={() => this.handleNumberClick(i)}
            />
        );
    }

    renderSubmitButton(i) {
        return (
            <Submit
                onClick={() => this.handleSubmitClick()}
            />
        );
    }

    renderClearButton(i) {
        return (
            <Clear
                onClick={() => this.handleClearClick()}
            />
        );
    }

    renderGuessArea() {
        return (
            <GuessArea
                value = {this.state.guess}
            />
        )
    }

    render() { 
        return(
            <div>
                <div className="bullsandcows-title" style={{position: 'absolute', left: '50%', top: '0%',
                    transform: 'translate(-50%, 0%)'}}>
                    <p> Bulls and Cows </p>
                </div>
                <div style={{position: 'absolute', left: '50%', top: '25%',
                    transform: 'translate(-50%, 0%)'}}>
                    {this.renderGuessArea()}
                </div>
                <div className="row" style={{position: 'absolute', left: '50%', top: '40%',
                    transform: 'translate(-50%, 0%)'}}>
                {this.renderNumber("0")}
                {this.renderNumber("1")}
                {this.renderNumber("2")}
                {this.renderNumber("3")}
                {this.renderNumber("4")}
                {this.renderNumber("5")}
                {this.renderNumber("6")}
                {this.renderNumber("7")}
                {this.renderNumber("8")}
                {this.renderNumber("9")}
                </div>
                <div className= "row" style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, 10%)'}}>
                {this.renderSubmitButton()}
                {this.renderClearButton()}
                </div>
            </div>
        );
    }
}

export default BullsAndCowsBoard;