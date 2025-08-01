import { useState } from "react";
import "./App.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const result = calculateWinner(nextSquares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
  }

  const status = winner
    ? `Winner: ${winner === "X" ? "❌" : "⭘"}`
    : squares.every(Boolean)
    ? "It's a Draw!"
    : `Next player: ${xIsNext ? "❌" : "⭘"}`;

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, i) => (
          <button
            key={i}
            className={`square ${
              winningLine.includes(i) ? "highlight" : ""
            }`}
            onClick={() => handleClick(i)}
          >
            {value === "X" ? "❌" : value === "O" ? "⭘" : ""}
          </button>
        ))}
      </div>
      <button className="restart" onClick={restartGame}>
        🔁 Restart Game
      </button>
    </div>
  );
}
