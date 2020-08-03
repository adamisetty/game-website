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
    this.myAPI = new API({url: flaskApiUrl});
    this.myAPI.createEntity({name: 'matching'});
    //console.log("before");
    this.myAPI.endpoints.matching.create_game({game: 'matching'});
    //console.log("after");
   }

   async handleClick(i) {
    try {
      var game_data = await this.myAPI.endpoints.matching.make_turn({game: 'matching'}, {position: i});
      console.log(typeof (game_data.data["games_data"][0]["board"]));
      const tiles = this.state.tiles.slice();
      tiles[i] = game_data.data["games_data"][0]["winner"][i];

      if (!(game_data.data["games_data"][0]["isWinner"] == "true")) {
        tiles[i] = game_data.data["games_data"][0]["board"][i];
      }
      this.setState({tiles: tiles});
    } catch (error) {
      console.log("error");
    }
  }

   renderMatching(i) {
       return (
           <Matching
               value = {this.state.tiles[i]}
               onClick={() => this.handleClick(i)}
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
                {this.renderMatching('0')}
                {this.renderMatching('1')}
                {this.renderMatching('2')}
                {this.renderMatching('3')}
               </div>
               <div className="board-row">
                {this.renderMatching('4')}
                {this.renderMatching('5')}
                {this.renderMatching('6')}
                {this.renderMatching('7')}
               </div>
               <div className="board-row">
                {this.renderMatching('8')}
                {this.renderMatching('9')}
                {this.renderMatching('10')}
                {this.renderMatching('11')}
               </div>
               <div className="board-row">
                {this.renderMatching('12')}
                {this.renderMatching('13')}
                {this.renderMatching('14')}
                {this.renderMatching('15')}
               </div>
           </div>
           </div>
       );
    }
}

export default MatchingBoard;