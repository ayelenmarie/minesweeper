import {MAX_COLS, MAX_ROWS} from '~/constants/board'
import {CellType, CellValue, CellState} from '~/types/CellTypes'

export const generateCells = (): CellType[][] => {
    const cells: CellType[][] = []

for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([])
    for (let col = 0; col< MAX_COLS; col++) {
        cells[row].push({
            value: CellValue.none,
            state: CellState.closed,
        })
    }
}

return cells
}