import { useState } from 'react'; //Importamos useState

function Square({ value, onSquareClick }) {//onSquareClickfunción a los Squareaccesorios del componente
  return ( //Squarellamará el componente cuando se haga clic en él
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
//Establece que el primer movimiento sea "X" de forma predeterminada. 
function Board({ xIsNext, squares, onPlay }) { //xIsNext, squaresy una nueva onPlayfunción que Boardpuede llamar con la matriz de cuadrados actualizada cada vez que un jugador hace un movimiento.
  function handleClick(i) { //handleClickfunción está codificada para actualizar el índice del cuadrado superior izquierdo ( 0). 
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    //Cada vez que un jugador se mueve, 
    //xIsNext(un valor booleano) se invertirá para determinar qué jugador es el siguiente y se guardará el estado del juego. 
    if (xIsNext) {
      nextSquares[i] = 'X'; //agregar X al tablero
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);//setSquaresllamadas setXIsNexten handleClickel Boardcomponente con una sola llamada a su nueva onPlayfunción para que el Gamecomponente pueda actualizar Boardcuando el usuario haga clic en un cuadrado
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row"> 
      // actualizar los otros ocho cuadrados para llamar handleClickdesde las funciones de flecha que pasa. 
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> //onSquareClickpropiedad a una función en el Boardcomponente que nombrará handleClick
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; //stablecerá si el número al que está cambiando es par xIsNext.truecurrentMove
  const currentSquares = history[currentMove];//componente para renderizar el movimiento seleccionado actualmente, en lugar de renderizar siempre el movimiento final:

  function handlePlay(nextSquares) {
    //ada vez que se realiza un movimiento, debe actualizar currentMovepara señalar la última entrada del historial
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {//appara transformar sus
    // historymovimientos en elementos React que representan botones en la pantalla, y mostrará una lista de botones para "saltar" a movimientos anteriores.
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />//xIsNext, currentSquaresy handlePlaycomo accesorios para el Boardcomponente
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

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
