import React, { useCallback, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../theme/Colors'

/*
 * Types
 */

type CellProps = {
    width: number
    height: number
    onReveal: () => void
    onExplode: () => void
}

type DimensionProps = {
    width: number
    height: number
}

export const Cell = ({ width, height, onReveal, onExplode }: CellProps) => {
    const [revealed, setRevealed] = useState(false)
    const isMine = Math.random() < 0.2
    const neighbours = 7

    const handleReveal = useCallback(() => {
        if (revealed) {
            return
        }
        if (isMine) {
            onExplode()
        }
        else {
            setRevealed(true)
            onReveal()
        }
    }, [])

    return (
        <>
            {!revealed ? (
                <TouchableOpacity onPress={handleReveal}>
                    <Container width={width} height={height}></Container>
                </TouchableOpacity> )
            :
            (<RevealedContainer width={width} height={height}>
               {isMine ? <Mine source={require('~/images/explosion.png')} width={width} height={height} /> :
               neighbours ? <Text>{neighbours}</Text> : null}
                </RevealedContainer>)}
        </>
    )
}

/*
 * Styles
 */

const Container = styled.View<DimensionProps>`
    background-color: ${Colors.PINK_500};
    border-width: 1.5px;
    border-color: ${(Colors.PINK_100, Colors.PINK_100, Colors.PINK_800, Colors.PINK_800)};
    width: ${props => props.width};
    height: ${props => props.height};
`

const RevealedContainer = styled.View<DimensionProps>`
    background-color: ${Colors.PINK_500};
    width: ${props => props.width};
    height: ${props => props.height};
`

const Mine = styled.Image<DimensionProps>`
    width: ${props => props.width / 2};
    height: ${props => props.height / 2};
`
