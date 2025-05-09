import React, { useState } from 'react';
import './App.css';

// Square Component: Represents a single square in the Tic-Tac-Toe grid
const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

// Board Component: Represents the Tic-Tac-Toe grid
const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
};

// App Component: The main component where the game logic resides
const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Handle a click on a square
  const handleClick = (index) => {
    if (squares[index] || winner) return; 

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O'; // Set the square to 'X' or 'O'

    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner);
    }
  };

  // Reset the game
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  // Calculate the winner based on the current squares
  const calculateWinner = (squares) => {
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
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <Board squares={squares} onClick={handleClick} />
      {winner ? (
        <div className="status">
          <p>{`Winner: ${winner}`}</p>
          <button className="restart-btn" onClick={resetGame}>Restart</button>
        </div>
      ) : (
        <div className="status">
          <p>{`Next Player: ${xIsNext ? 'X' : 'O'}`}</p>
        </div>
      )}
    </div>
  );
};

export default App;
