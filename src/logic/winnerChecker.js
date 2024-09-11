export function checkWinner (boardToCheck) {
    for (let i = 0; i < 3; i++) {
        if (
        boardToCheck[i] !== null &&
        boardToCheck[i] === boardToCheck[i + 3] &&
        boardToCheck[i] === boardToCheck[i + 6]
        ) { return true }
        else if (
        boardToCheck[i * 3] !== null &&
        boardToCheck[i * 3] === boardToCheck[i * 3 + 1] &&
        boardToCheck[i * 3] === boardToCheck[i * 3 + 2]
        ) { return true }
        else if (
        boardToCheck[i] !== null &&
        boardToCheck[i] === boardToCheck[i + 4] &&
        boardToCheck[i] === boardToCheck[i + 8]
        ) { return true }
        else if (
        boardToCheck[i + 2] !== null &&
        boardToCheck[i + 2] === boardToCheck[i + 4] &&
        boardToCheck[i + 2] === boardToCheck[i + 6]
        ) { return true }
    }
    return null
}

export function checkDraw (boardToCheck) {
    return !boardToCheck.includes(null)
}