import React from 'react';
import './gameboard.css';
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

function Tile(props) {
   return (
   <button className="tile" onClick={props.onClick}>
       {props.value}
   </button>
   );
}

class TicTacToeBoard extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           tiles: Array(9).fill(null)
       };
   }

   renderTile(i) {
       return (
           <Tile
               value = {this.state.tiles[i]}
           />
       )
   }

   render() {
       return (
           <div>
               <div className="board-row">
                {this.renderTile(0)}
                {this.renderTile(0)}
                {this.renderTile(0)}
               </div>
               <div className="board-row">
                {this.renderTile(0)}
                {this.renderTile(0)}
                {this.renderTile(0)}
               </div>
               <div className="board-row">
                {this.renderTile(0)}
                {this.renderTile(0)}
                {this.renderTile(0)}
               </div>
           </div>
       );
   }
}


export default TicTacToeBoard;