import React from 'react'
import styled from 'styled-components/native'

import { Cell } from '~/components/board/Cell'
import { CellType } from '~/types/CellTypes'

/*
 * Types
 */

type BoardProps = {
    cells: CellType[][]
    boardSize: number
    cellSize: number
    onCellPressIn: () => void
    onCellPressOut: () => void
    onCellPress(rowParam: number, celParam: number): () => void
    onLongCellPress(rowParam: number, celParam: number): () => void

}

type ContainerProps = {
    boardSize: number
}

export const Board = ({ cells, boardSize, cellSize, onCellPress, onCellPressIn, onCellPressOut, onLongCellPress }: BoardProps) => {
    const renderCells = (): React.ReactNode => {
        return cells.map((row, rowIndex) => row.map((cell, colIndex) => <Cell key={`${rowIndex}-${colIndex}`} onCellPressIn={onCellPressIn} onCellPressOut={onCellPressOut} state={cell.state} value={cell.value} row={rowIndex} col={colIndex} onCellPress={onCellPress} onLongCellPress={onLongCellPress} />))
    }

    const boardWidth = cellSize * boardSize

    return (
        <Container boardSize={boardWidth} >
{renderCells()}
        </Container>
    )
}

/*
 * Styles
 */

const Container = styled.View<ContainerProps>`
flex-direction: row;
flex-wrap: wrap;
    width: ${props => props.boardSize};
    height: ${props => props.boardSize};

`
