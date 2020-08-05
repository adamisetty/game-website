import React from 'react';
import './anagrams.css';
import API from './api.js';

const flaskApiUrl = "http://127.0.0.1:5000";

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
            <button className= "anagrams-submit">
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
            score: 0
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

    async handleLetterClick(i) {
        this.state.word = this.state.word + this.state.letters[i];
        const letters = this.state.letters;
        this.state.letters[i] = "";
        this.setState({letters: letters});
        console.log('word: ', this.state.word);
    }

    async handleSubmitClick() {
        var turn_data = await this.myAPI.endpoints.anagrams.make_turn({game: 'anagrams'}, {position: this.state.word});
        this.state.word = "";

        const start_board = Array(6).fill('_');
        for (let i = 0; i < 6; i++) {
            start_board[i] = this.state.o_board[i]; 
        }
        this.setState({letters: start_board});
        var score = turn_data.data["games_data"][0]["score"];
        this.setState({score: score});

        console.log('score:', this.state.score);
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

    render() { 
        return(
            <div>
                <div className="anagrams-title">
                    <p> Anagrams </p>
                </div>
                <div style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(95%, -250%)'}}>
                    {this.renderInfoButton("score")}  
                </div>
                <div style={{position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(0%, 10%)'}}>
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
}

export default AnagramsBoard;
