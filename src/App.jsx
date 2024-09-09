import { useState } from 'react'
import './App.css'

const TURNS = {
  X: '✖',
  O: '◯',
}

const BOARD = Array(9).fill(null)


const Cell = ({ children, isSelected, updateCell, index }) => {
  {console.log(isSelected)}
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

  const updateCell = (index) => {
    if (board[index] === null) {
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
  
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)
    }
  }

  return (
    console.log('render'),
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
