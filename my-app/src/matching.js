import React from 'react';
import './matching.css';
import API from './api.js';

const flaskApiUrl = "http://127.0.0.1:5000";

class Matching extends React.Component {
    render() {
      return (
        <button
          className="tile"
          onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }

class MatchingBoard extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           tiles: Array(16).fill(null),
           gameOver: false
       };
    this.positionString = "";
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'matching'});
    this.timesClicked = 1;
    this.firstCardClicked = -1;
    this.secondCardClicked = -1;
    this.myAPI.endpoints.matching.create_game({game: 'matching'});
   }

   coverMatchWithX() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('X');
            }, 2000);
        });
   }

   hideWrongGuess() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(' ');
            }, 2000);
        });
   }

   async handleClick(i) {
   if (this.timesClicked % 2 != 0) {
   this.firstCardClicked = i;
   var first_position = i;
   this.positionString = first_position.toString();
   this.positionString = this.positionString.concat("-");
   this.timesClicked++;
   console.log(this.positionString);
   } else {
        this.handleSecondClick(i);
   }
  }

  async handleSecondClick(i) {
    this.secondCardClicked = i;
    if (this.secondCardClicked != this.firstCardClicked) {
    this.timesClicked++
    var second_position = i;
    this.positionString = this.positionString.concat(second_position.toString());
    console.log(this.positionString);

    try {
      var game_data = await this.myAPI.endpoints.matching.make_turn({game: 'matching'}, {position: this.positionString});
      const tiles = this.state.tiles.slice();
      console.log(game_data.data["games_data"][0]["winner"]);

      if (tiles[this.firstCardClicked] == 'X' || tiles[this.secondCardClicked] == 'X') {
            this.setState({tiles: tiles});
            return;
      }
      tiles[this.firstCardClicked] = game_data.data["games_data"][0]["winner"][this.firstCardClicked];
      tiles[this.secondCardClicked] = game_data.data["games_data"][0]["winner"][this.secondCardClicked];
      this.setState({tiles: tiles});

      if (game_data.data["games_data"][0]["board"][this.firstCardClicked] == 'X'
        && game_data.data["games_data"][0]["board"][this.secondCardClicked] == 'X') {
        const xMark = await this.coverMatchWithX();
        tiles[this.firstCardClicked] = xMark;
        tiles[this.secondCardClicked] = xMark;
        this.setState({tiles: tiles});
        if (game_data.data["games_data"][0]["isWinner"] === true) {
        this.setState({gameOver: true})
      }
        } else {
            const hiddenSpace = await this.hideWrongGuess();
            tiles[this.firstCardClicked] = hiddenSpace;
            tiles[this.secondCardClicked] = hiddenSpace;
            this.setState({tiles: tiles});
        }
    } catch (error) {
      console.log("error");
    }
    }
  }
   renderCard(i) {
    return (
        <Matching
            value = {this.state.tiles[i]}
            onClick = {() => this.handleClick(i)}
            />
    );
   }

   render() {
        if (this.state.gameOver === false) {
        return (
           <div>
           <div className="title">
           <p> Matching </p>
           </div>
           <div
           style={{
           position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
            }}>
               <div className="board-row">
                {this.renderCard('0')}
                {this.renderCard('1')}
                {this.renderCard('2')}
                {this.renderCard('3')}
               </div>
               <div className="board-row">
                {this.renderCard('4')}
                {this.renderCard('5')}
                {this.renderCard('6')}
                {this.renderCard('7')}
               </div>
               <div className="board-row">
                {this.renderCard('8')}
                {this.renderCard('9')}
                {this.renderCard('10')}
                {this.renderCard('11')}
               </div>
               <div className="board-row">
                {this.renderCard('12')}
                {this.renderCard('13')}
                {this.renderCard('14')}
                {this.renderCard('15')}
               </div>
           </div>
           </div>
       );
       } else {
            return(
                <div>
                    <div className="Matching" style={{position: 'absolute', left: '50%', top: '-2%',
                        transform: 'translate(-50%, 0%)'}}>
                        <p> Matching </p>
                    </div>
                    <div className="Matching-GameOver" style={{position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, 0%)'}}>
                        <h3> You won!</h3>
                    </div>
                </div>
            );
       }
    }
}

export default MatchingBoard;