import React from 'react';
import './gameboard.css';
import API from './api.js';

const flaskApiUrl = "http://127.0.0.1:5000";

//import square from './gameboard.css';

// function Game() {
// return
// ( <React.Fragment>
// <div id="errors" style="
//  background: #c00;
//  color: #fff;
//  display: none;
//  margin: -20px -20px 20px;
//  padding: 20px;
//  white-space: pre-wrap;
// "> <h1> hello </h1> </div>
// <div id="game"></div>
// </React.Fragment>);
// }

// function Tile(props) {
//    return (
//    <button className="tile" onClick={props.onClick()}>
//        {props.value}
//    </button>
//    );
// }


class Tile extends React.Component {
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
  

class TicTacToeBoard extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           tiles: Array(9).fill(null)
       };
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'tictactoe'});
    //console.log("before");
    this.myAPI.endpoints.tictactoe.create_game({game: 'tictactoe'});
    //console.log("after");
   }

   async handleClick(i) {
    try {
      var game_data = await this.myAPI.endpoints.tictactoe.make_turn({game: 'tictactoe'}, {position: i});
      console.log(typeof (game_data.data["games_data"][0]["board"]));
      const tiles = this.state.tiles.slice();
      if (!(game_data.data["games_data"][0]["isWinner"] == "true")) {
        tiles[i] = game_data.data["games_data"][0]["board"][i];
      }
      this.setState({tiles: tiles});
    } catch (error) {
      console.log("error");
    }
    
  }

   renderTile(i) {
       return (
           <Tile
               value = {this.state.tiles[i]}
               onClick={() => this.handleClick(i)}
           />
       );
   }

   render() {
       return (
           <div>
               <div className="board-row">
                {this.renderTile('0')}
                {this.renderTile('1')}
                {this.renderTile('2')}
               </div>
               <div className="board-row">
                {this.renderTile('3')}
                {this.renderTile('4')}
                {this.renderTile('5')}
               </div>
               <div className="board-row">
                {this.renderTile('6')}
                {this.renderTile('7')}
                {this.renderTile('8')}
               </div>
           </div>
       );
   }
}


export default TicTacToeBoard;