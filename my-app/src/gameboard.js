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
    this.myAPI.endpoints.tictactoe.create_game({game: 'tictactoe'});
   }

   handleClick(i) {
    var game_data = this.myAPI.endpoints.tictactoe.make_turn({game: 'tictactoe'}, {position: '0'});
    //var json_data = JSON.parse(game_data);
    console.log(typeof game_data);
    const tiles = this.state.tiles.slice();
    tiles[i] = 'd';
    this.setState({tiles: tiles});
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
                {this.renderTile(0)}
                {this.renderTile(1)}
                {this.renderTile(2)}
               </div>
               <div className="board-row">
                {this.renderTile(3)}
                {this.renderTile(4)}
                {this.renderTile(5)}
               </div>
               <div className="board-row">
                {this.renderTile(6)}
                {this.renderTile(7)}
                {this.renderTile(8)}
               </div>
           </div>
       );
   }
}


export default TicTacToeBoard;