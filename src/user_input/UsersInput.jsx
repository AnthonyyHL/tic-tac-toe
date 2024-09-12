import React, { useState } from 'react'

import { Cell } from '../components/Cell'
import { TURNS_ICONS } from '../constants'

import './UsersInput.css'

const PlayerInputCard = ({ player, icon, handlePlayerChange }) => {
  const playerLabelClassName = icon === TURNS_ICONS.X ? 'player-1' : 'player-2'
  return (
    <section className="player-input-card">
      <label
        htmlFor={playerLabelClassName}
        className={`player ${playerLabelClassName}`}
      >
        {playerLabelClassName.replace('-', ' ').toLocaleUpperCase()}
      </label>
      <Cell>{icon}</Cell>
      <input
        id={player}
        className="player-input"
        type="text"
        defaultValue={player}
        onBlur={(e) => handlePlayerChange(e, icon)}
      />
    </section>
  )
}

function UsersInput() {
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
      <button className="start-game-btn">Start Game</button>
    </section>
  )
}

export default UsersInput
