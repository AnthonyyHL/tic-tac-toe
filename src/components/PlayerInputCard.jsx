import React from 'react'

import { Cell } from '../components/Cell'
import { TURNS_ICONS } from '../constants'

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
        placeholder="Enter your name"
        defaultValue={player}
        onBlur={(e) => handlePlayerChange(e, icon)}
      />
    </section>
  )
}

export default PlayerInputCard
