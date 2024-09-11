import React from 'react'

import { Cell } from '../components/Cell'
import { TURNS_ICONS } from '../constants'

import './UsersInput.css'

function UsersInput() {
  return (
    <section className="player-input-container">
      <section className="player-input-card">
        <label htmlFor="player1" className="player1">
          Player 1
        </label>
        <Cell>{TURNS_ICONS.X}</Cell>
        <input type="text" onBlur={(e) => console.log(e.target.value)} />
      </section>
    </section>
  )
}

export default UsersInput
