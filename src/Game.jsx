import React, { useState } from 'react'

import App from './app/App.jsx'
import UsersInput from './user_input/UsersInput.jsx'

import './index.css'

function Game() {
  const [gameState, setGameState] = useState(() => {
    const gameStateInLocalStorage = window.localStorage.getItem('gameState')
    return gameStateInLocalStorage || false
  }) // false: game not started | true: game started

  const startGame = (isGameStarted) => {
    setGameState(isGameStarted)
    window.localStorage.setItem('gameState', isGameStarted)
  }

  const finishGame = () => {
    setGameState(false)
    window.localStorage.removeItem('gameState')
    window.localStorage.removeItem('player1')
    window.localStorage.removeItem('player2')

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('gameStats')
  }

  return gameState ? (
    <App finishGame={finishGame} />
  ) : (
    <UsersInput startGame={startGame} />
  )
}

export default Game
