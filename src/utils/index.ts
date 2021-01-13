import {MAX_COLS, MAX_ROWS, BOMBS} from '~/constants/board'
import {CellType, CellValue, CellState} from '~/types/CellTypes'

export const generateCells = (): CellType[][] => {
    let cells: CellType[][] = []

    // Generates a two dimensional array of cells with its initial state

for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([])
    for (let col = 0; col< MAX_COLS; col++) {
        cells[row].push({
            value: CellValue.none,
            state: CellState.closed,
        })
    }
}

// Randomly place mines
let bombsPlaced = 0
while (bombsPlaced < BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS)
    const randomCol = Math.floor(Math.random() * MAX_COLS)

    const currentCell = cells[randomRow][randomCol]
    if (currentCell.value !== CellValue.bomb) {
        cells = cells.map((row, rowIndex) => row.map((cell, colIndex) => {
            if (randomRow === rowIndex && randomCol === colIndex) {
                return {
                    ...cell,
                    value: CellValue.bomb
                }
        }

        return cell
    }))
    bombsPlaced++
    }
}

// Calculate the number of bombs surrounding the cell

for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
        const currentCell = cells[rowIndex][colIndex]

        if (currentCell.value === CellValue.bomb) {
            continue
        }

        let numberOfBombs = 0
        const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null
        const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null
        const topRightBomb = rowIndex > 0 && colIndex < MAX_COLS - 1 ? cells[rowIndex -1][colIndex + 1] : null
        const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null
        const rightBomb = colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1] : null
        const bottomLeftBomb = rowIndex < MAX_ROWS - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1] : null
        const bottomBomb = rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null
        const bottomRightBomb = rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1 ? cells[rowIndex + 1][colIndex + 1] : null

        if (topLeftBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (topBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (topRightBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (leftBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (rightBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (bottomLeftBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (bottomBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (bottomRightBomb?.value === CellValue.bomb) {
            numberOfBombs++
        }
        if (numberOfBombs > 0) {
            cells[rowIndex][colIndex] = {
                ...currentCell,
                value: numberOfBombs
            }
        }

    }
}

return cells
}