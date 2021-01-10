import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

import { Board } from '../components/board/Board'
import { Colors } from '../theme/Colors'

/*
 * Constants
 */

export const BOARD_SIZE = 10
export const CELL_SIZE = 30

/*
 * Types
 */

type GameProps = {
    onBackPress: () => void
}

export const GameView = ({ onBackPress }: GameProps) => {
    return (
        <Container>
            <HeaderContainer>
                <BackButtonContainer onPress={onBackPress}>
                    <Icon source={require('~/images/chevron-left.png')} />
                </BackButtonContainer>
            </HeaderContainer>
            <ContentContainer>
                <SectionTitle>LET'S GET THE GAME STARTED</SectionTitle>
                <Spacer />
                <Board boardSize={BOARD_SIZE} cellSize={CELL_SIZE} />
            </ContentContainer>
        </Container>
    )
}

/*
 * Styles
 */

const Container = styled.View`
    flex: 1;
    background-color: ${Colors.MUSK_GREEN};
`

const ContentContainer = styled.View`
    padding: 10px;
    align-items: center;
`

const HeaderContainer = styled.View`
    margin-top: ${Platform.OS === 'ios' ? '25px' : '0'};
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`

const BackButtonContainer = styled.TouchableOpacity`
    padding: 5px;
`

const Icon = styled.Image`
    width: 20px;
    height: 20px;
    color: ${Colors.PINK};
`

const SectionTitle = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: ${Colors.MUSTARD};
`

const Spacer = styled.View`
    height: 10px;
`
