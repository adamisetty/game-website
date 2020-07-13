import React from 'react';
import './gameboard.css';

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
        )
    }
}