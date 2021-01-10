import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'

import { Colors } from '../../theme/Colors'
import BOARD_SIZE from '~/screens/GameScreen'
import CELL_SIZE from '~/screens/GameScreen'
import { Cell } from '~/components/board/Cell'
import { times } from 'lodash'

/*
 * Types
 */

type BoardProps = {
    boardSize: number
    cellSize: number
}

type ContainerProps = {
    boardSize: number
}

export const Board = ({ boardSize, cellSize }: BoardProps) => {
    const handleReveal = useCallback(() => {
        // aca va a ir la logica de limpiar los neighbours
        console.warn('REVEAL GENERAL')
    }, [])

    const handleExplode = useCallback(() => {
        // aca va a ir la logica de cuando explota una celda y se termina el juego
        console.warn('REVEAL GENERAL')
    }, [])

    const boardWidth = cellSize * boardSize
    const grid = []

    return (
        <Container boardSize={boardWidth} >
            {times(boardSize, () => times(boardSize, () => <Cell width={cellSize} height={cellSize} onReveal={handleReveal} onExplode={handleExplode} />))}
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
    background-color: ${Colors.PINK_500};
`
