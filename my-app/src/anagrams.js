import React from 'react';
import './anagrams.css';
import API from './api.js';
import ReactDOM from 'react-dom';
import App from './App';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const flaskApiUrl = "http://127.0.0.1:5000";

class HomeButton extends React.Component {
    render() {
        return (
        <button className='anagrams-home'
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
            className="letter"
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
               className="anagrams-submit"
               onClick={() => this.props.onClick()}
            >
                {'submit'}
            </button>
        );
    }
}

class InfoButton extends React.Component {
    render() {
        return (
            <button className= "anagrams-word">
                {this.props.value}
            </button>
        )
    }
}

class StatusButton extends React.Component {
    render() {
        return (
            <button className="anagrams-status">
                {this.props.value}
            </button>
        )
    }
}

class AnagramsBoard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            letters: Array(6).fill('_'),
            o_board: Array(6).fill('_'),
            word:'',
            score: 0,
            status:'',
            time: 0,
            game_over: false,
            columnDefs: [
                { headerName: "Words", field: "word" }],
            rowData: []
        };
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'anagrams'});
    this.fillLetters();
    }

    async fillLetters() {
        try {
            var start_data = await this.myAPI.endpoints.anagrams.create_game({game: 'anagrams'});
            const letters = this.state.letters;
            const o_board = this.state.o_board;
            for (let i = 0; i < 6; i++) {
                var single_letter = start_data.data["games_data"][0]["board"][i];
                this.state.letters[i] = single_letter;
                this.state.o_board[i] = single_letter;
            }
            this.setState({letters: letters});
            this.setState({o_board: o_board});

        } catch (error) {
            console.log("error");
        }
    }

    async handleHomeClick() {
        ReactDOM.render(
              <App />,
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

    async handleLetterClick(i) {
        this.state.word = this.state.word + this.state.letters[i];
        const letters = this.state.letters;
        this.state.letters[i] = "";
        this.setState({letters: letters});
        //console.log('word: ', this.state.word);

        if (this.state.status != "") {
            var status = "";
            this.setState({status: status});
        }
    }

    async handleSubmitClick() {
        var turn_data = await this.myAPI.endpoints.anagrams.make_turn({game: 'anagrams'}, {position: this.state.word});
        const temp_word = this.state.word;
        this.state.word = "";
        const start_board = Array(6).fill('_');
        for (let i = 0; i < 6; i++) {
            start_board[i] = this.state.o_board[i]; 
        }
        this.setState({letters: start_board});
        const score = turn_data.data["games_data"][0]["score"];
        this.setState({score: score});

        console.log('score:', this.state.score);
        var status = turn_data.data["games_data"][0]["current-player"];
        this.changeStatus(status, temp_word);

        //console.log(turn_data.data["games_data"][0]["isWinner"]);
        if (turn_data.data["games_data"][0]["isWinner"]) {
            this.state.game_over = true;
            //this.setState({game_over: true});
        }
    }

    changeStatus(val, temp_word) {
        var status = "";
        if (val == 0) {
            status = "Invalid"
        }
        if (val == 1) {
            status = "Correct"
            console.log("word: ", temp_word);
            var guesses = this.state.rowData;
            const newData = guesses.concat({word: temp_word});
            this.setState({rowData: newData});
        }
        if (val == 2) {
            status = "Already found"
        }
        this.setState({status: status});
        //console.log(status);
    }

    renderTile(i) {
        return (
            <Letter
                value = {this.state.letters[i]}
                onClick={() => this.handleLetterClick(i)}
            />
        );
    }

    renderSubmitButton() {
        return (
            <Submit
                currentWord = {""}
                onClick={() => this.handleSubmitClick()}
            />
        );
    }

    renderInfoButton(val) {
        if (val == "score") {
            return (
                <InfoButton
                value = {this.state.score}
                />
            )   
        }
        if (val == "guess") {
            return (
                <InfoButton
                value = {this.state.word}
                />
            )   
        }
    }

    renderStatusButton() {
        return (
            <StatusButton
            value = {this.state.status}
            />
        )  
    }

    render() { 
        if (this.state.game_over == false) {
        return(
            <div>
                <div>
                    {this.renderHomeButton()}
                </div>
                <div className="anagrams-title">
                    <p> Anagrams </p>
                </div>
                <div style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(75%, -250%)'}}>
                    {this.renderInfoButton("score")} 
                </div>
                <div style={{position: 'absolute', left: '59%', top: '60%',
                    transform: 'translate(75%, -250%)'}}>
                    {this.renderStatusButton()}
                </div>
                <div className= "row" style={{position: 'absolute', left: '50%', top: '17%',
                    transform: 'translate(-50%, 50%)'}}>
                    {this.renderInfoButton("guess")}    
                </div>
                <div className="row" style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -10%)'}}>
                {this.renderTile(0)}
                {this.renderTile(1)}
                {this.renderTile(2)}
                {this.renderTile(3)}
                {this.renderTile(4)}
                {this.renderTile(5)}
                </div>
                <div className= "row" style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, 100%)'}}>
                {this.renderSubmitButton()}
                </div>
        </div>
        )
    }
    else {
        return (
           <div>
               <div>
                        {this.renderHomeButton()}
                    </div>
               <div className="anagrams-title">
                    <p> Game Over! </p>
                </div>
                <div className= "row" style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -150%)'}}>
                    {this.renderInfoButton("score")} 
                </div>
                <div>
                <div className="ag-theme-alpine" style={ {height: '200px', width: '200px', position: 'absolute', left: '50%', top: '90%',
                    transform: 'translate(-50%, -150%)'} }>
            <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
            </AgGridReact>
                </div>
                </div>
           </div> 
        )
    }
    }
}

export default AnagramsBoard;
