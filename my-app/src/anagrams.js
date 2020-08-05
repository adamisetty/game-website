import React from 'react';
import './anagrams.css';
import API from './api.js';

const flaskApiUrl = "http://127.0.0.1:5000";

class Letter extends React.Component {
    render() {
        console.log(this.props.value);
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
                className="submit"
            >
                {'submit'}
            </button>
        )
    }
}

class AnagramsBoard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            letters: Array(6).fill('_'),
            word:''
        };
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'anagrams'});
    this.fillLetters();
    }

    async fillLetters() {
        try {
            var start_data = await this.myAPI.endpoints.anagrams.create_game({game: 'anagrams'});
            const letters = this.state.letters;
            for (let i = 0; i < 6; i++) {
                var single_letter = start_data.data["games_data"][0]["board"][i];
                this.state.letters[i] = single_letter;
            }
            this.setState({letters: letters});

        } catch (error) {
            console.log("error");
        }
    }

    async handleLetterClick(i) {
        const letters = this.state.letters;
        this.state.letters[i] = 'X';
        this.setState({letters: letters});
    }

    async handleSubmitClick() {}

    renderTile(i) {
        console.log(this.state.letters[i]);
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

    render() { 
        return(
            <div>
                <div className="anagrams-title">
                    <p> Anagrams </p>
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
                <Submit></Submit>
                </div>
        </div>
        )
    }
}

export default AnagramsBoard;
