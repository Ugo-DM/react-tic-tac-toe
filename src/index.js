import React from 'react';
import ReactDOM from 'react-dom/client';
import {createRoot} from 'react-dom/client'
import './style.css';

// console.log('Hello React');

function Square(props){
    return (
        <button className="square" onClick={props.onClick}> 
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {  // Class constructor
        super(props) // JS classes always need to call 'super(props)'
        this.state = { // state() method is used to store the click event for the Square class
            squares: Array(9).fill(null), // We create an array of 9 elements and fill it with 'null' values by default
            xIsNext: true // By default, first click on square will be 'X'
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice() // We create a copy of the squares array using slice() method for //!immuability reasons. 
        // Immuability allows us to avoid direct datas mutation by mutating a copy of these datas. So we can, for example, go back to previous version of datas. 
        if(calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O' // Here we check if  xIsNext is true. If it's true then state value will be 'X', if not it'll be 'O'
        this.setState({
            squares: squares, //Now the state is stored in the Board component
            xIsNext: !this.state.xIsNext
        }) 
    }

  renderSquare(i) {
    return <Square 
        value={this.state.squares[i]} // Value of a square now comes from squares array we created in the Board constructor
        onClick={() => this.handleClick(i)} // When a square is clicked React will call the onClick() that is defined in the square method
    />; 
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if(winner) {
        status = 'Winner : ' + winner
    }else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O') // Next play will be displayed as 'X' or 'O' depending on xIsNext boolean
    }
    
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


// Function that decides who's the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}