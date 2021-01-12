import React, { useCallback, useState } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { NumberDisplay } from '~/components/board/NumberDisplay'

import { Board } from '../components/board/Board'
import { Colors } from '../theme/Colors'
import {BOARD_SIZE, CELL_SIZE} from '~/constants/board'
import { EmojiButton } from '~/components/board/EmojiButton'
import { EmojiState, EmojiType } from '~/types/EmojiTypes'

/*
 * Types
 */

type GameProps = {
    onBackPress: () => void
}

export const GameView = ({ onBackPress }: GameProps) => {
    const [emoji, setEmoji] = useState<EmojiType>(EmojiType.smile)
    const [emojiPressed, setEmojiPressed] = useState(false)

// Actions when selected Cell is pressed in
const handleCellPressIn = useCallback(() => {
    setEmoji(EmojiType.surprise)
} ,[])

// Actions when selected Cell is pressed out
const handleCellPressOut = useCallback(() => {
    setEmoji(EmojiType.smile)
} ,[])


// Actions when EmojiButton is pressed in
const handleEmojiPressIn = useCallback(async() => {
   setEmoji(EmojiType.surprise)
setEmojiPressed(true)
} ,[])

// Actions when EmojiButton is pressed out
const handleEmojiPressOut = useCallback(async() => {
    setEmoji(EmojiType.smile)
    setEmojiPressed(false)

 } ,[])


    return (
        <Container>
            <NavigationHeaderContainer>
                <BackButtonContainer onPress={onBackPress}>
                    <Icon source={require('~/images/chevron-left.png')} />
                </BackButtonContainer>
            </NavigationHeaderContainer>
            <ContentContainer>
                <SectionTitle>MINESWEEPER</SectionTitle>
                <CounterHeaderContainer>
                    <NumberDisplay value={3} />
                    <EmojiButton emoji={emoji} pressed={emojiPressed} onPressIn={handleEmojiPressIn} onPressOut={handleEmojiPressOut} />
                    <NumberDisplay value={4} />
                </CounterHeaderContainer>
                <Spacer />
                <Board boardSize={BOARD_SIZE} cellSize={CELL_SIZE} onCellPressIn={handleCellPressIn} onCellPressOut={handleCellPressOut}  />
            </ContentContainer>
        </Container>
    )
}

/*
 * Styles
 */

const Container = styled.View`
    flex: 1;
    background-color: ${Colors.PINK};
`

const ContentContainer = styled.View`
    padding: 10px;
    align-items: center;
    justify-content: center;
`

const NavigationHeaderContainer = styled.View`
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

const CounterHeaderContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: ${Colors.PINK_600};
border-width: 3px;
    border-top-color: ${Colors.PINK_100};
    border-left-color: ${Colors.PINK_100};
    border-right-color: ${Colors.PINK_800};
    border-bottom-color: ${Colors.PINK_800};
width: ${BOARD_SIZE * CELL_SIZE};
height: 60;
`
