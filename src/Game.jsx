import React, { useState } from 'react'

import App from './app/App.jsx'
import UsersInput from './user_input/UsersInput.jsx'

import './index.css'

function Game() {
  const [gameState, setGameState] = useState(false) // false: game not started | true: game started

  const startGame = (isGameStarted) => {
    setGameState(isGameStarted)
  }

  return gameState ? <App /> : <UsersInput startGame={startGame} />
}

export default Game
