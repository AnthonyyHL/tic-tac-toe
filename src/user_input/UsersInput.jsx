import React, { useState } from 'react'

import { TURNS_ICONS } from '../constants'
import PlayerInputCard from '../components/PlayerInputCard'

import './UsersInput.css'

function UsersInput({ startGame }) {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')

  const handlePlayerChange = (e, icon) => {
    const { id, value } = e.target
    if (icon === TURNS_ICONS.O && id === player1) {
      alert('Player 2 name already exists')
      return
    }
    icon === TURNS_ICONS.X ? setPlayer1(value) : setPlayer2(value)
  }

  const handleStartGame = () => {
    startGame(true)
  }

  return (
    <section className="player-input-container">
      <label htmlFor="player-input-title" className="player-input-title">
        TIC TAC TOE
      </label>
      <section className="player-input-cards">
        <PlayerInputCard
          player={player1}
          icon={TURNS_ICONS.X}
          handlePlayerChange={handlePlayerChange}
        />
        <PlayerInputCard
          player={player2}
          icon={TURNS_ICONS.O}
          handlePlayerChange={handlePlayerChange}
        />
      </section>
      <button className="start-game-btn" onClick={handleStartGame}>
        Start Game
      </button>
    </section>
  )
}

export default UsersInput
