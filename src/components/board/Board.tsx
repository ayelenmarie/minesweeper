import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'

import { Colors } from '../../theme/Colors'
import BOARD_SIZE from '~/screens/GameScreen'
import CELL_SIZE from '~/screens/GameScreen'
import { Cell } from '~/components/board/Cell'
import { times } from 'lodash'
import {generateCells} from '~/utils/index'
import { EmojiType } from '~/types/EmojiTypes'

/*
 * Types
 */

type BoardProps = {
    boardSize: number
    cellSize: number
    onCellPressIn: () => void
    onCellPressOut: () => void

}

type ContainerProps = {
    boardSize: number
}

export const Board = ({ boardSize, cellSize, onCellPressIn, onCellPressOut }: BoardProps) => {
    const [cells, setCells] = useState(generateCells())

    const renderCells = (): React.ReactNode => {
        return cells.map((row, rowIndex) => row.map((cell, colIndex) => <Cell key={`${rowIndex}-${colIndex}`} onCellPressIn={onCellPressIn} onCellPressOut={onCellPressOut} />))
    }

    const handleReveal = useCallback((col: number, row: number) => {
        // aca va a ir la logica de limpiar los neighbours
        console.warn('REVEAL GENERAL')
    }, [])

    const handleExplode = useCallback(() => {
        // aca va a ir la logica de cuando explota una celda y se termina el juego
        console.warn('REVEAL GENERAL')
    }, [])

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
