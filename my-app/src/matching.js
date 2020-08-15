import React from 'react';
import './matching.css';
import API from './api.js';
import ReactDOM from 'react-dom';
import App from './App';

const flaskApiUrl = "http://127.0.0.1:5000";

class HomeButton extends React.Component {
  render() {
      return (
      <button className='matching-home'
          onClick={() => this.props.onClick()}>
              {'home'}
      </button>
      );
  }
}

class Matching extends React.Component {
    render() {
      return (
        <button
          className="matching-tile"
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
       this.myAPI = new API({url: flaskApiUrl});
       this.positionString = "";
       this.myAPI.createEntity({name: 'matching'});
       this.timesClicked = 1;
       this.firstCardClicked = -1;
       this.secondCardClicked = -1;
       this.twoFacesOpen = false;
       this.myAPI.endpoints.matching.create_game({game: 'matching'});
   }

   coverMatchWithX() {
        this.twoFacesOpen = true;
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('X');
            }, 1000);
        });
   }

   hideWrongGuess() {
        this.twoFacesOpen = true;
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(' ');
            }, 1000);
        });
   }

   async handleHomeClick() {
    ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
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

   async handleClick(i) {
   if (!this.twoFacesOpen) {  // Ensures that previous guess is not still in progress
        if (this.timesClicked % 2 !== 0) {
        this.firstCardClicked = i;
        var first_position = i;
        this.positionString = first_position.toString();
        this.positionString = this.positionString.concat("-");
        this.timesClicked++;
        } else {
            this.handleSecondClick(i);
        }
     }
  }

  async handleSecondClick(i) {
    this.secondCardClicked = i;
    if (this.secondCardClicked !== this.firstCardClicked) {
    this.timesClicked++
    var second_position = i;
    this.positionString = this.positionString.concat(second_position.toString()); // Input format is "int-int"

    try {
      var game_data = await this.myAPI.endpoints.matching.make_turn({game: 'matching'}, {position: this.positionString});
      console.log(game_data.data["games_data"][0]["winner"]);
      const tiles = this.state.tiles.slice();

      if (tiles[this.firstCardClicked] === 'X'
        || tiles[this.secondCardClicked] === 'X') { // Checks if card has already been matched
            this.setState({tiles: tiles});
            return;
      }
      tiles[this.firstCardClicked] = game_data.data["games_data"][0]["winner"][this.firstCardClicked];
      tiles[this.secondCardClicked] = game_data.data["games_data"][0]["winner"][this.secondCardClicked];
      this.setState({tiles: tiles});

      if (game_data.data["games_data"][0]["board"][this.firstCardClicked] === 'X'
        && game_data.data["games_data"][0]["board"][this.secondCardClicked] === 'X') { // Checks for a winner
        const xMark = await this.coverMatchWithX();
        tiles[this.firstCardClicked] = xMark;
        tiles[this.secondCardClicked] = xMark;
        this.twoFacesOpen = false;

        if (game_data.data["games_data"][0]["isWinner"] === true) {
        this.setState({gameOver : true});
        }
        this.setState({tiles: tiles});
        console.log("tiles set");
        } else { // Accounts for a wrong guess
            const hiddenSpace = await this.hideWrongGuess();
            tiles[this.firstCardClicked] = hiddenSpace;
            tiles[this.secondCardClicked] = hiddenSpace;
            this.twoFacesOpen = false;
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
        if (!this.state.gameOver) {
        return (
           <div /*className="menu-container"*/>
              <div>
              {this.renderHomeButton()}
              </div>
           <div className="matching-title">
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
                  <div>
                        {this.renderHomeButton()}
                    </div>
                    <div className="matching-gameover-title" style={{position: 'absolute', left: '50%', top: '-2%',
                        transform: 'translate(-50%, 0%)'}}>
                        <p> Matching </p>
                    </div>
                    <div className="matching-gameOver" style={{position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, 0%)'}}>
                        <h3> You won!</h3>
                    </div>
                </div>
            );
       }
    }
}

export default MatchingBoard;