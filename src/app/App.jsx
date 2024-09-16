import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { checkWinner, checkDraw } from '../logic/winnerChecker'
import { winnerModel } from '../components/WinnerModel'
import { Cell } from '../components/Cell'
import { TURNS, TURNS_ICONS } from '../constants'

import './App.css'
import '../general_styles/alertModel.css'
import '../returnMainModelAlert.css'

function ReturnMainMenuModel(
  isReturnAlertVisible,
  finishGame,
  setIsReturnAlertVisible,
) {
  if (!isReturnAlertVisible) return null

  return (
    <section className="return-main-menu-alert-container">
      <div className="return-main-menu-alert">
        <header className="return-main-menu-alert-header">
          <h2>Return to main menu</h2>
        </header>
        <footer>
          <button className="return-alert-btn yes" onClick={finishGame}>
            Yes
          </button>
          <button
            className="return-alert-btn cancel"
            onClick={() => {
              setIsReturnAlertVisible(false)
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </section>
  )
}

const GameStatCard = ({ turn, wins }) => {
  return (
    <div className="game-stat">
      <Cell>{turn}</Cell>
      <span className="win-counter-text">{`${wins} Wins`}</span>
    </div>
  )
}

function App({ finishGame }) {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [gameStats, setGameStats] = useState(() => {
    const gameStatsFromStorage = window.localStorage.getItem('gameStats')
    return gameStatsFromStorage
      ? JSON.parse(gameStatsFromStorage)
      : { x: 0, o: 0, draw: 0 }
  })
  const [winner, setWinner] = useState(null) // null: no winner | false: draw | true: winner
  const [isReturnAlertVisible, setIsReturnAlertVisible] = useState(false)

  const updateStats = (winner) => {
    if (winner) {
      const newGameStats =
        turn === TURNS.X
          ? { ...gameStats, x: gameStats.x + 1 }
          : { ...gameStats, o: gameStats.o + 1 }
      setGameStats(newGameStats)
    } else {
      setGameStats({ ...gameStats, draw: gameStats.draw + 1 })
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
        setWinner(newWinner) // los estados son ASÍNCRONOS
        confetti({
          zIndex: 100,
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
        updateStats(newWinner)
      } else if (checkDraw(newBoard)) {
        setWinner(false)
        updateStats(false)
      }
    }
  }

  useEffect(() => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  }, [board, turn])

  useEffect(() => {
    window.localStorage.setItem('gameStats', JSON.stringify(gameStats))
  }, [gameStats])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <>
      <header>
        <div className="exit-btn">
          <img
            src="src/assets/return_icon.svg"
            alt="Return to main page"
            className="exit-icon"
            onClick={() => {
              setIsReturnAlertVisible(true)
            }}
          />
        </div>

        {ReturnMainMenuModel(
          isReturnAlertVisible,
          finishGame,
          setIsReturnAlertVisible,
        )}

        <div className="game-winning-history">
          <GameStatCard turn={TURNS_ICONS.X} wins={gameStats.x} />
          <GameStatCard turn={TURNS_ICONS.O} wins={gameStats.o} />
          <GameStatCard turn={TURNS_ICONS.DRAW} wins={gameStats.draw} />
        </div>
      </header>

      <section className="game">
        {board.map((cell, index) => (
          <Cell key={index} index={index} updateCell={updateCell}>
            {cell === TURNS.X
              ? TURNS_ICONS.X
              : cell === TURNS.O
                ? TURNS_ICONS.O
                : null}
          </Cell>
        ))}
      </section>

      <footer className="turns">
        <Cell isSelected={turn === TURNS.X}>{TURNS_ICONS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS_ICONS.O}</Cell>
      </footer>

      {winnerModel(winner, turn, resetGame)}
    </>
  )
}

export default App
