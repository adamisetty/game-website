import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import TicTacToeBoard from './tictactoe';
import AnagramsBoard from './anagrams';
import BullsAndCowsBoard from './bullsandcows';
import MatchingBoard from './matching';
import HangmanBoard from './hangman';

// function App() {
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
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClick(name) {
    if (name == "Tic Tac Toe") {
      ReactDOM.render(
        <React.StrictMode>
          <TicTacToeBoard />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    if (name == "Anagrams") {
      ReactDOM.render(
        <React.StrictMode>
          <AnagramsBoard />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    if (name == "Bulls & Cows") {
      ReactDOM.render(
        <React.StrictMode>
          <BullsAndCowsBoard />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    if (name == "Matching") {
      ReactDOM.render(
        <React.StrictMode>
          <MatchingBoard />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    if (name == "Hangman") {
      ReactDOM.render(
        <React.StrictMode>
          <HangmanBoard />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
  }

  renderButton(name, className) {
    return (
      <Button
          value = {name}
          cN = {className}
          onClick={() => this.handleClick(name)}
      />
    );
  }

  render() {
    return (
    <div>
      <div className='title-home'>Breaktime Games</div>
      <div className='row' style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:'15px', marginBottom: '15px'}}>
        {this.renderButton("Bulls & Cows", 'gamebutton-bullsandcows')}
      </div>
      <div className='row' style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:'15px', marginBottom: '15px'}}>
        {this.renderButton("Matching", 'gamebutton-matching')}
      </div>
      <div className='row' style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:'15px', marginBottom: '15px'}}>
        {this.renderButton("Tic Tac Toe", 'gamebutton-tictactoe')}
      </div>
      <div className='row' style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:'15px', marginBottom: '15px'}}>
        {this.renderButton("Anagrams", 'gamebutton-anagrams')}
      </div>
      <div className='row' style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:'15px', marginBottom: '15px'}}>
        {this.renderButton("Hangman", 'gamebutton-hangman')}
      </div>
    </div>
    );
  }
}

class Button extends React.Component {
  render() {
      return (
      <button
          className={this.props.cN}
          onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
    )
  }
}

export default App;
