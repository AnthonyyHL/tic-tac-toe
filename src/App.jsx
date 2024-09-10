import { useState } from 'react'
import './App.css'

const TURNS = {
  X: '✖',
  O: '◯',
}

const BOARD = Array(9).fill(null)

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
      return null
    }
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
        setWinner(newWinner)
      }

    }
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          BOARD.map((cell, index) => (
            <Cell
              key={index}
              index={index}
              updateCell={updateCell}
            >
              {board[index]}
            </Cell>
          ))
        }
      </section>
      <section className="turns">
        <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
      </section>
    </>
  )
}

export default App
