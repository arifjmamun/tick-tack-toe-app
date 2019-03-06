import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    currentPlayer: 'X',
    winner: undefined,
    squares: Array(9).fill('')
  };

  winningMoves = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,4,6], [3,4,5],
    [2,5,8], [6,7,8]
  ];

  makeMove = (index) => {
    if (this.state.squares[index]) return;
    this.setState((prevState) => {
      const currentPlayer = prevState.currentPlayer === 'X' ? 'O' : 'X';
      prevState.squares[index] = currentPlayer;
      return {
        currentPlayer,
        squares: prevState.squares
      };
    });
    setTimeout(() => this.findOutWinner());
  };

  findOutWinner = () => {
    const { squares } = this.state;
    for (let i = 0; i < this.winningMoves.length; i++) {
      const move = this.winningMoves[i];
      if (squares[move[0]] === 'X' && squares[move[1]] === 'X' && squares[move[2]] === 'X') {
        this.setState({ winner: 'X'});
        return;
      } else if (squares[move[0]] === 'O' && squares[move[1]] === 'O' && squares[move[2]] === 'O') {
        this.setState({ winner: 'O'});
        return;
      }
    }
  };

  render() {
    const { squares, winner } = this.state;
    if (winner) console.log(winner);
    return (
      <div className="App">
        <div className="board">
          {squares.map((square, index) => (
            <div key={index} className="square" onClick={() => this.makeMove(index)}>
              <div className="square-inner">
                <p className="text">{square}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
