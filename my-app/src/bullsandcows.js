import React from 'react';
import './bullsandcows.css';
import API from './api.js';
import ReactDOM from 'react-dom'

const flaskApiUrl = "http://127.0.0.1:5000";

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
                className="submit"
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
                className="submit"
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
            guess: ''
        };
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'bullsandcows'});
    this.myAPI.endpoints.bullsandcows.create_game({game: 'bullsandcows'});
    }

    async handleNumberClick(i) {
        if (this.state.guess.length < 4) {
            this.state.guess += i; 
        }
        console.log(this.state.guess);
    }

    async handleSubmitClick() {
        //make guess
        //this.state.guess.setState('');
        this.setState({guess: ''});
        console.log('hello');
    }

    async handleClearClick() {
        this.setState({guess: ''});
        console.log('hello');
    }

    renderNumber(i) {
        return (
            <Number
                value = {i}
                onClick={() => this.handleNumberClick(i)}
            />
        );
    }

    renderSubmitButton() {
        return (
            <Submit
                onClick={() => this.handleSubmitClick()}
            />
        );
    }

    renderClearButton() {
        return (
            <Clear
                onClick={() => this.handleClearClick()}
            />
        );
    }

    render() { 
        return(
            <div>
                <div className="bullsandcows-title" style={{position: 'absolute', left: '50%', top: '0%',
                    transform: 'translate(-50%, 0%)'}}>
                    <p> Bulls and Cows </p>
                </div>
                <div className="current-guess" style={{position: 'absolute', left: '50%', top: '20%',
                    transform: 'translate(-50%, 0%)'}}>
                    <p> {this.state.guess} </p>
                </div>
                <div className="row" style={{position: 'absolute', left: '50%', top: '40%',
                    transform: 'translate(-50%, 0%)'}}>
                {this.renderNumber('0')}
                {this.renderNumber('1')}
                {this.renderNumber('2')}
                {this.renderNumber('3')}
                {this.renderNumber('4')}
                {this.renderNumber('5')}
                {this.renderNumber('6')}
                {this.renderNumber('7')}
                {this.renderNumber('8')}
                {this.renderNumber('9')}
                </div>
                <div className= "row" style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, 10%)'}}>
                {this.renderSubmitButton()}
                {this.renderClearButton()}
                </div>
        </div>
        )
    }
}

export default BullsAndCowsBoard;