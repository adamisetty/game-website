import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './gameboard.html';

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

ReactDOM.render(
  <TicTacToeBoard />,
  document.getElementById('root')
);

export default Tile;

//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;
