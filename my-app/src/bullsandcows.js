import React from 'react';
import './bullsandcows.css';
import API from './api.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ReactDOM from 'react-dom';
import App from './App';
// npm install --save ag-grid-community ag-grid-react

const flaskApiUrl = "http://127.0.0.1:5000";

class HomeButton extends React.Component {
    render() {
        return (
        <button className='bullsandcows-home'
            onClick={() => this.props.onClick()}>
                {'home'}
        </button>
        );
    }
}

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
            guess:'',
            gameover: false,
            secretcode: '',
            score: '',
            columnDefs: [
                { headerName: "Guess", field: "guess" },
                { headerName: "Bulls", field: "bulls" },
                { headerName: "Cows", field: "cows" }],
              rowData: []
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

    //the follwing method is from https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
    formatTime(seconds) {
        var hrs = ~~(seconds / 3600);
        var mins = ~~((seconds % 3600) / 60);
        var secs = ~~seconds % 60;

        var time = "";

        if (hrs > 0) {
            time += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        time += "" + mins + ":" + (secs < 10 ? "0" : "");
        time += "" + secs;
        return time;
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
        if (guess.length === 4) {
            var game_data = await this.myAPI.endpoints.bullsandcows.make_turn({game: 'bullsandcows'}, {position: guess});
            this.setState({guess:''});
            console.log(game_data.data["games_data"][0]["winner"]);
            var last_turn = game_data.data["games_data"][0]["board"].length - 1;
            var bulls = game_data.data["games_data"][0]["board"][last_turn][1];
            var cows = game_data.data["games_data"][0]["board"][last_turn][2];
            var guesses = this.state.rowData;
            var this_guess = [{ guess: guess, bulls: bulls, cows: cows }];
            const newData = this_guess.concat(guesses);
            this.setState({rowData: newData});
            if (game_data.data["games_data"][0]["isWinner"] === true) {
                var code = game_data.data["games_data"][0]["winner"];
                var score = this.formatTime(parseInt(game_data.data["games_data"][0]["score"]));
                this.setState({gameover: true});
                this.setState({secretcode: code});
                this.setState({score: score});
            }
        }
    }


    async handleClearClick() {
        this.setState({guess: ''});
    }

    async handleHomeClick() {
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
        if(this.state.gameover === false) {
            return(
                <div>
                    <div>
                        {this.renderHomeButton()}
                    </div>
                    <div className="bullsandcows-title" style={{position: 'absolute', left: '50%', top: '-2%',
                        transform: 'translate(-50%, 0%)'}}>
                        <p> Bulls and Cows </p>
                    </div>
                    <div style={{position: 'absolute', left: '50%', top: '18%',
                        transform: 'translate(-50%, 0%)'}}>
                        <p> Try to guess the 4 digit secret code. All guesses must contain 4 different numbers. A bull means you have the correct digit in the correct spot. A cow means you have a correct digit but not in the correct position. Your latest guess along with the bulls and cows will appear at the top of the table while the last row of the tabel will contain your first guess. </p>
                    </div>
                    <div style={{position: 'absolute', left: '50%', top: '28%',
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
                    <div className="ag-theme-alpine" style={{height: '200px', width: '600px', position: 'absolute', left: '50%', top: '65%',
                    transform: 'translate(-50%, 0%)'} }>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <div>
                        {this.renderHomeButton()}
                    </div>
                    <div className="bullsandcows-title" style={{position: 'absolute', left: '50%', top: '-2%',
                        transform: 'translate(-50%, 0%)'}}>
                        <p> Bulls and Cows </p>
                    </div>
                    <div className="bullsandcows-gameover" style={{position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, 0%)'}}>
                        <h3> You won! You cracked the code!</h3>
                        <p> Time ~ {this.state.score} </p>
                        <p> Secret Code ~ {this.state.secretcode} </p>
                    </div>                  
                </div>
            );
        }
    }
}

export default BullsAndCowsBoard;