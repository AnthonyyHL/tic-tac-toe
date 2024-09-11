import { Cell } from '../components/Cell'
import { TURNS } from '../constants'

export function winnerModel(winner, turn, resetGame) {
    if (winner === null) return null

    return (
        <section className="winner-container">
            <div className="winner">

            <header className="game-result">
                {
                winner === true ? (
                    <p className="alert-container win">
                    <Cell>{ turn !== TURNS.X ? TURNS.X : TURNS.O }</Cell>
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