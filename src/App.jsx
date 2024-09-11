import { useState } from 'react'

import { checkWinner, checkDraw } from './logic/winnerChecker'
import { winnerModel } from './logic/winnerModel'
import { Cell } from './components/Cell'
import { TURNS } from './constants'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null: no winner | false: draw | true: winner

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
      
      { winnerModel(winner, turn, resetGame) }
      
    </>
  )
}

export default App
