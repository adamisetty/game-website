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

class AnagramsBoard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            letters: Array(6).fill('_')
        };
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'anagrams'});
    //this.myAPI.endpoints.anagrams.create_game({game: 'anagrams'});
    this.fillLetters();
    }

    async fillLetters() {
        try {
            var start_data = await this.myAPI.endpoints.anagrams.create_game({game: 'anagrams'});
            //console.log(start_data.data["games_data"][0]["board"])
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

    render() { 
        return(
            <div>
            <h1>HELLO</h1>
        </div>
        )
    }
}

export default AnagramsBoard;
