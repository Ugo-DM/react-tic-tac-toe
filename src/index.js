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

  renderSquare(i) {
    return <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)} 
    />; 
  }

  render() {
    return (
      <div>
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
    constructor(props) { // Class constructor
        super(props) // JS classes always need to call 'super(props)'
        this.state = { // state() method is used to store the click event for the Square class
            history : [{
                squares : Array(9).fill(null) // Here we create an array we will use for history purpose and fill it with null value
            }],
            stepNumber: 0, // setpNumber value is 0 by default
            xIsNext: true // By default, first click on square will be 'X'
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1) // Here we throw away all the future history if we go back to previous moves
        const current = history[history.length - 1]
        const squares = current.squares.slice() // We create a copy of the squares array using slice() method for //!immuability reasons. 
        // Immuability allows us to avoid direct datas mutation by mutating a copy of these datas. So we can, for example, go back to previous version of datas. 
        if(calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O' // Here we check if  xIsNext is true. If it's true then state value will be 'X', if not it'll be 'O'
        this.setState({
            history : history.concat([{ // the concat() method act the same as push() method but doesn't mutate the original array
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        }) 
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => { // step stands for current history element value & move refers to it's index
        const desc = move ? 'Go to move #' + move : 'Go to game start'
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    let status
    if(winner) {
        status = 'Winner : ' + winner
    }else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O') // Next play will be displayed as 'X' or 'O' depending on xIsNext boolean
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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