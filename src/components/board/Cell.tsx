import React, { useCallback, useState } from 'react'
import { Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../theme/Colors'

/*
 * Types
 */

type CellProps = {
    // width: number
    // height: number
    // col: number
    // row: number
    // onReveal: (col: number, row: number) => void
    // onExplode: () => void
    onCellPressIn: () => void
    onCellPressOut: () => void
}

type DimensionProps = {
    width: number
    height: number
}

export const Cell: React.FC<CellProps> = ({onCellPressIn, onCellPressOut}) => {
    return (
        <TouchableWithoutFeedback
        onPressIn={onCellPressIn}
        onPressOut={onCellPressOut}
        >
            <Container />
        </TouchableWithoutFeedback>

    )
}

/*
 * Styles
 */

const Container = styled.View`
    background-color: ${Colors.PINK_500};
    border-width: 3px;
    border-top-color: ${Colors.PINK_100};
    border-left-color: ${Colors.PINK_100};
    border-right-color: ${Colors.PINK_800};
    border-bottom-color: ${Colors.PINK_800};
    width: 30;
    height: 30;
`

const RevealedContainer = styled.View<DimensionProps>`
justify-content: center;
align-items: center;
    background-color: ${Colors.PINK_500};
    width: ${props => props.width};
    height: ${props => props.height};
`

const Mine = styled.Image<DimensionProps>`
    width: ${props => props.width / 2};
    height: ${props => props.height / 2};
`
