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
           tiles: Array(16).fill(null)
       };
    this.positionString = "";
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'matching'});
    this.timesClicked = 1;
    this.firstCardClicked = -1;
    this.secondCardClicked = -1;
    this.isClickOdd = true;
    this.isX = false;
    //console.log("before");
    this.myAPI.endpoints.matching.create_game({game: 'matching'});
    //console.log("after");
   }

   async handleClick(i) {
   if (this.timesClicked % 2 != 0) {
   this.firstCardClicked = i;
   this.isClickOdd = false
   var first_position = i;
   this.positionString = first_position.toString();
   this.positionString = this.positionString.concat("-");
   this.timesClicked++;
   console.log("hello");
   console.log(this.timesClicked);
   console.log(this.positionString);
   } else {
        this.handleSecondClick(i);
   }
  }

  async timeFunction(tiles, index, time) {
  while (this.isX && new Date().getTime() > time + 2000) {
        console.log(new Date().getTime());
        tiles[index] = 'X';
        this.isX = false;
        }
  }

  async handleSecondClick(i) {
    this.secondCardClicked = i;
    if (this.secondCardClicked != this.firstCardClicked) {
    console.log("in Secondclick");
    this.timesClicked++
    var second_position = i;
    this.positionString = this.positionString.concat(second_position.toString());
    console.log(this.positionString);
    try {
      var game_data = await this.myAPI.endpoints.matching.make_turn({game: 'matching'}, {position: this.positionString});
      console.log(typeof (game_data.data["games_data"][0]["board"]));
      const tiles = this.state.tiles.slice();
      console.log(game_data.data["games_data"][0]["winner"]);

      for (let index = 0; index < 16; index++) {
        if (game_data.data["games_data"][0]["board"][index] == 'X') {
        tiles[index] = game_data.data["games_data"][0]["winner"][index];
        const unixTime = Math.floor(Date.now());
        console.log(unixTime);
        await timeFunction(tiles, index, unixTime);

//            setTimeout(() => {
//               tiles[index] = 'X';
//            }, 2000);
        }
      }
      this.setState({tiles: tiles});
    } catch (error) {
      console.log("error");
    }
    }
  }




   renderCard(i) {
//   if (this.timesClicked % 2 != 0) {
//   return (
//           <Matching
//               value = {this.state.tiles[i]}
//                onClick={() => this.handleClick(i)}
//           />
//       );
//   } else {
//   return (
//           <Matching
//               value = {this.state.tiles[i]}
//                onClick={() => this.handleSecondClick(i)}
//           />
//       );
//   }
    return (
        <Matching
            value = {this.state.tiles[i]}
            onClick = {() => this.handleClick(i)}
            />
    );
   }

    render() { 
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
    }
}

export default MatchingBoard;