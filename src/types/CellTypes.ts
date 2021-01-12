export enum CellValue {
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb,
}

export enum CellState {
    closed,
    revealed, 
    flagged,
}

export type CellType = {
    value: CellValue
    state: CellState
}