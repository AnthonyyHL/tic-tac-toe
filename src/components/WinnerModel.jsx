/* eslint-disable react/react-in-jsx-scope */
import { Cell } from './Cell'
import { TURNS, TURNS_ICONS } from '../constants'

export function winnerModel(winner, turn, resetGame) {
    if (winner === null) return null

    return (
        <section className="winner-container">
            <div className="winner">

                <header className="game-result">
                    {
                    winner === true ? (
                        <p className="alert-container win">
                            <Cell>{
                                turn !== TURNS.X ?
                                TURNS_ICONS.X : turn !== TURNS.O ?
                                TURNS_ICONS.O : null    
                            }</Cell>
                            Wins
                        </p>
                    ) : (
                        <p className="alert-container draw">Draw</p>
                    )
                    }
                </header>

                <footer>
                    <button className="play-again-btn" onClick={resetGame}>
                        Play Again
                    </button>
                </footer>

            </div>
        </section>
    )
}