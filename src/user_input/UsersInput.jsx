import React, { useState } from 'react'

import { TURNS_ICONS } from '../constants'
import PlayerInputCard from '../components/PlayerInputCard'

import './UsersInput.css'
import { useEffect } from 'react'

function UsersInput({ startGame }) {
  const [player1, setPlayer1] = useState(() => {
    const player1FromStorage = window.localStorage.getItem('player1')
    return player1FromStorage ? player1FromStorage : ''
  })
  const [player2, setPlayer2] = useState(() => {
    const player2FromStorage = window.localStorage.getItem('player2')
    return player2FromStorage ? player2FromStorage : ''
  })

  const handlePlayerChange = (e, icon) => {
    const { id, value } = e.target
    if (icon === TURNS_ICONS.O && id === player1) {
      alert('Player 2 name already exists')
      return
    }
    if (value === null) {
      icon === TURNS_ICONS.X ? setPlayer1('Player 1') : setPlayer2('Player 2')
    }
    icon === TURNS_ICONS.X ? setPlayer1(value) : setPlayer2(value)
  }

  const handleStartGame = () => {
    startGame(true)
  }

  useEffect(() => {
    if (player1 || player2) {
      if (player1 === player2) {
        setPlayer1('')
        setPlayer2('')
        alert('Players names must be different')
        return
      }
      const player1FromStorage = window.localStorage.getItem('player1')
      const player2FromStorage = window.localStorage.getItem('player2')
      if (player1FromStorage !== player1) {
        window.localStorage.setItem('player1', player1)
      }
      if (player2FromStorage !== player2) {
        window.localStorage.setItem('player2', player2)
      }

      return
    } else {
      window.localStorage.removeItem('player1')
      window.localStorage.removeItem('player2')

      window.localStorage.setItem('player1', player1)
      window.localStorage.setItem('player2', player2)
    }
  }, [player1, player2])

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
