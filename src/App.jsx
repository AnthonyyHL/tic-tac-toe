import React, { useState } from 'react'
import confetti from 'canvas-confetti'

import { checkWinner, checkDraw } from './logic/winnerChecker'
import { winnerModel } from './components/WinnerModel'
import { Cell } from './components/Cell'
import { TURNS, TURNS_ICONS } from './constants'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
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
        confetti(
          {
            zIndex: 100,
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          }
        )
      } else if (checkDraw(newBoard)) {
        setWinner(false)
      }
    }
  }

  useEffect(() => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  }, [board, turn])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
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
              {
                cell === TURNS.X ?
                TURNS_ICONS.X : cell === TURNS.O ?
                TURNS_ICONS.O : null
              }
            </Cell>
          ))
        }
      </section>

      <section className="turns">
        <Cell isSelected={turn === TURNS.X}>{TURNS_ICONS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS_ICONS.O}</Cell>
      </section>
      
      { winnerModel(winner, turn, resetGame) }

    </>
  )
}

export default App
