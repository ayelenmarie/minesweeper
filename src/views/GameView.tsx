import React, { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { NumberDisplay } from '~/components/board/NumberDisplay'

import { Board } from '../components/board/Board'
import { Colors } from '../theme/Colors'
import {BOARD_SIZE, CELL_SIZE} from '~/constants/board'
import { EmojiButton } from '~/components/board/EmojiButton'
import { EmojiState, EmojiType } from '~/types/EmojiTypes'
import { generateCells, openAdjacentCells } from '~/utils'
import { CellState, CellType, CellValue } from '~/types/CellTypes'
import { Cell } from '~/components/board/Cell'

/*
 * Types
 */

type GameProps = {
    onBackPress: () => void
}

export const GameView = ({ onBackPress }: GameProps) => {
    const [cells, setCells] = useState<CellType[][]>(generateCells())
    const [emoji, setEmoji] = useState<EmojiType>(EmojiType.smile)
    const [emojiPressed, setEmojiPressed] = useState(false)
    const [time, setTime] = useState<number>(0)
    const [live, setLive] = useState<boolean>(false)
    const [bombCounter, setBombCounter] = useState<number>(10)

    
    // Starts the game (if not started)
    useEffect(() => {
if (live && time < 999) {
    const timer = setInterval(() => {
        setTime(time + 1)
    }, 1000)
    return () => {
        clearInterval(timer)
    }
}
    }, [live, time])

// Actions when selected Cell is pressed in
const handleCellPressIn = useCallback((): void => {
    setEmoji(EmojiType.surprise)
} ,[])

// Actions when selected Cell is pressed out
const handleCellPressOut = useCallback((): void => {
    setEmoji(EmojiType.smile)
} ,[])


// Actions when EmojiButton is pressed in
const handleEmojiPressIn = useCallback((): void => {
   setEmoji(EmojiType.surprise)
setEmojiPressed(true)
} ,[])

// Actions when EmojiButton is pressed out
const handleEmojiPressOut = useCallback((): void => {
    setEmoji(EmojiType.smile)
    setEmojiPressed(false)

 } ,[])

 /**
  * Pressing on a cell behaviour
  * @param rowParam 
  * @param colParam 
  */

 const handleCellPress = (rowParam: number, colParam: number) => (): void => {

    // Starts the game
if (!live) {
    // Prevents pressing on bomb when starting game
    setLive(true)
}

// Makes copy of cells array to manipulate its state
let newCells = cells.slice()
const currentCell = cells[rowParam][colParam]

/*
* Reveals cells
*/

if (currentCell.value === CellValue.bomb) {
    // Takes care of bomb click after game started
} else if (currentCell.value === CellValue.none) {

// Spreads none cells
newCells = openAdjacentCells(newCells, rowParam, colParam)
setCells(newCells)
}

// Clicking on revealed or flagged cells does nothing else
if (currentCell.state === CellState.revealed || currentCell.state === CellState.flagged) {
    return
} 
else if (currentCell.state === CellState.closed) {
newCells[rowParam][colParam].state = CellState.revealed
setCells(newCells)
}

 }


 // Restarts game with emoji
 const handleEmojiPress = (): void => {
if (live) {
    setLive(false)
    setTime(0)
    setCells(generateCells())
    setBombCounter(10) // TODO: delete this hardcoded number
}
 }

 
 // Flags & unflags cell
 const handleLongCellPress = (rowParam: number, colParam: number) => (): void => {

    // Prevent flaggin when game is not live
     if(!live) {
         return
     }

// Makes copy of cells array to manipulate its state
     const newCells = cells.slice()
     const currentCell = cells[rowParam][colParam]

     if (currentCell.state === CellState.revealed) {
         return
     } 
     else if (currentCell.state === CellState.closed) {
newCells[rowParam][colParam].state = CellState.flagged
setCells(newCells)
    setBombCounter(bombCounter - 1)
     } else if (currentCell.state === CellState.flagged) {
        newCells[rowParam][colParam].state = CellState.closed
        setCells(newCells)
            setBombCounter(bombCounter + 1)
     }
 }

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
                    <NumberDisplay value={bombCounter} />
                    <EmojiButton emoji={emoji} pressed={emojiPressed} onPress={handleEmojiPress} onPressIn={handleEmojiPressIn} onPressOut={handleEmojiPressOut} />
                    <NumberDisplay value={time} />
                </CounterHeaderContainer>
                <Spacer />
                <Board cells={cells} boardSize={BOARD_SIZE} cellSize={CELL_SIZE} onCellPress={handleCellPress} onCellPressIn={handleCellPressIn} onCellPressOut={handleCellPressOut} onLongCellPress={handleLongCellPress} />
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
