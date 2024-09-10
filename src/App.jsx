import { useState } from 'react'
import './App.css'

const TURNS = {
  X: <img src="src/assets/cross.png" alt="X" />,
  O: <img src="src/assets/circle.png" alt="X" />
}

const Cell = ({ children, isSelected, updateCell, index }) => {
  const className = `cell ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateCell(index)
  }

  return (
    <button className={className} onClick={ handleClick }>
      {children}
    </button>
  )
}


function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null: no winner | false: draw | true: winner

  const checkWinner = (boardToCheck) => {
    for (let i = 0; i < 3; i++) {
      if (
        boardToCheck[i] !== null &&
        boardToCheck[i] === boardToCheck[i + 3] &&
        boardToCheck[i] === boardToCheck[i + 6]
      ) { return true }
      else if (
        boardToCheck[i * 3] !== null &&
        boardToCheck[i * 3] === boardToCheck[i * 3 + 1] &&
        boardToCheck[i * 3] === boardToCheck[i * 3 + 2]
      ) { return true }
      else if (
        boardToCheck[i] !== null &&
        boardToCheck[i] === boardToCheck[i + 4] &&
        boardToCheck[i] === boardToCheck[i + 8]
      ) { return true }
      else if (
        boardToCheck[i + 2] !== null &&
        boardToCheck[i + 2] === boardToCheck[i + 4] &&
        boardToCheck[i + 2] === boardToCheck[i + 6]
      ) { return true }
    }
    return null
  }

  const checkDraw = (boardToCheck) => {
    return !boardToCheck.includes(null)
  }

  const updateCell = (index) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
  
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)

      const newWinner = checkWinner(newBoard)
      if (newWinner) {
        setWinner(newWinner) // los estados son ASÍNCRONOS
      } else if (checkDraw(newBoard)) {
        setWinner(false)
      }
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((cell, index) => (
            <Cell
              key={index}
              index={index}
              updateCell={updateCell}
            >
              {cell}
            </Cell>
          ))
        }
      </section>

      <section className="turns">
        <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
      </section>
      
      {
        winner !== null && (
          <section className="winner-container">
            <div className="winner">

              <header className="game-result">
                {
                  winner === true ? (
                    <p className="alert-container win">
                      <Cell>{ turn !== TURNS.X ? TURNS.X : TURNS.O }</Cell>
                      Wins
                    </p>
                  ) : (
                    <p className="alert-container draw">Draw</p>
                  )
                }
              </header>
              <footer>
                <button className="play-again-btn" onClick={resetGame}>
                  Play Again
                </button>
              </footer>
            </div>
          </section>
        )
      }
    </>
  )
}

export default App
