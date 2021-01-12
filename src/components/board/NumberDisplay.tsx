import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '~/theme/Colors'

interface NumberDisplayProps {
    value: number
}

export const NumberDisplay: React.FC<NumberDisplayProps> = ({value}) => {
    return (
        <Container>
            <Number>{value.toString().padStart(3, '0')}</Number>
        </Container>
    )
}


/*
 * Styles
 */

const Container = styled.View`
    margin: 10px;
    background-color: ${Colors.PURPLE};
    border-width: 3px;
    border-top-color: ${Colors.PINK_100};
    border-left-color: ${Colors.PINK_100};
    border-right-color: ${Colors.PINK_800};
    border-bottom-color: ${Colors.PINK_800};
    width: 60;
    height: 40;
justify-content: center;
align-items: center;
`

const Number = styled.Text`
    color: ${Colors.PINK_600};
    font-weight: 800;

`