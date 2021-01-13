import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { NumberDisplay } from '~/components/board/NumberDisplay';

import { Board } from '../components/board/Board';
import { Colors } from '../theme/Colors';
import { CELL_SIZE } from '~/constants/board';
import { EmojiButton } from '~/components/board/EmojiButton';
import { EmojiType } from '~/types/EmojiTypes';
import { generateCells, openAdjacentCells } from '~/utils';
import { CellState, CellType, CellValue } from '~/types/CellTypes';

/*
 * Types
 */

type GameProps = {
  bombs: number;
  maxRows: number;
  maxCols: number;
  onBackPress: () => void;
};

type CounterHeaderProps = {
  maxRows: number;
};

export const GameView: React.FC<GameProps> = ({ bombs, maxRows, maxCols, onBackPress }) => {
  const [cells, setCells] = useState<CellType[][]>(generateCells(bombs, maxRows, maxCols));
  const [emoji, setEmoji] = useState<EmojiType>(EmojiType.smile);
  const [emojiPressed, setEmojiPressed] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(bombs);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Starts the game (if not started)
  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  useEffect(() => {
    if (gameOver) {
      setEmoji(EmojiType.dead);
      setLive(false);
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameWon) {
      setLive(false);
      setEmoji(EmojiType.won);
    }
  }, [gameWon]);

  // Actions when selected Cell is pressed in
  const handleCellPressIn = useCallback((): void => {
    setEmoji(EmojiType.surprise);
  }, []);

  // Actions when selected Cell is pressed out
  const handleCellPressOut = useCallback((): void => {
    setEmoji(EmojiType.smile);
  }, []);

  // Actions when EmojiButton is pressed in
  const handleEmojiPressIn = useCallback((): void => {
    setEmoji(EmojiType.surprise);
    setEmojiPressed(true);
  }, []);

  // Actions when EmojiButton is pressed out
  const handleEmojiPressOut = useCallback((): void => {
    setEmoji(EmojiType.smile);
    setEmojiPressed(false);
  }, []);

  /**
   * Pressing on a cell behaviour
   * @param rowParam
   * @param colParam
   */

  const handleCellPress = (rowParam: number, colParam: number) => (): void => {
    // Makes copy of cells array to manipulate its state
    let newCells = cells.slice();

    // Starts the game
    if (!live) {
      // Prevents pressing on bomb when starting game
      let isABomb = newCells[rowParam][colParam].value === CellValue.bomb;
      while (isABomb) {
        newCells = generateCells(bombs, maxRows, maxCols);
        if (newCells[rowParam][colParam].value !== CellValue.bomb) {
          isABomb = false;
          break;
        }
      }
      setLive(true);
    }

    const currentCell = newCells[rowParam][colParam];

    /*
     * Reveals cells
     */

    // Clicking on revealed or flagged cells does nothing else
    if (currentCell.state === CellState.revealed || currentCell.state === CellState.flagged) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      setGameOver(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      // Spreads none cells
      newCells = openAdjacentCells(newCells, rowParam, colParam, maxRows, maxCols);
    } else if (currentCell.state === CellState.closed) {
      newCells[rowParam][colParam].state = CellState.revealed;
    }

    // Check if game is won
    let safeClosedCellsExist = false;
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        const currentCell = newCells[row][col];

        if (currentCell.value !== CellValue.bomb && currentCell.state === CellState.closed) {
          safeClosedCellsExist = true;
          break;
        }
      }
    }

    if (!safeClosedCellsExist) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        }),
      );

      setGameWon(true);
    }

    setCells(newCells);
  };

  // Restarts game with emoji
  const handleEmojiPress = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells(bombs, maxRows, maxCols));
    setBombCounter(bombs);
    setGameOver(false);
    setGameWon(false);
  };

  // Flags & unflags cell
  const handleLongCellPress = (rowParam: number, colParam: number) => (): void => {
    // Prevent flaggin when game is not live
    if (!live) {
      return;
    }

    // Makes copy of cells array to manipulate its state
    const newCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.revealed) {
      return;
    } else if (currentCell.state === CellState.closed) {
      newCells[rowParam][colParam].state = CellState.flagged;
      setCells(newCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      newCells[rowParam][colParam].state = CellState.closed;
      setCells(newCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const showAllBombs = (): CellType[][] => {
    const currentCells = cells.slice();

    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.revealed,
          };
        }

        return cell;
      }),
    );
  };

  return (
    <Container>
      <NavigationHeaderContainer>
        <BackButtonContainer onPress={onBackPress}>
          <Icon source={require('~/images/chevron-left.png')} />
        </BackButtonContainer>
      </NavigationHeaderContainer>
      <ContentContainer>
        <SectionTitle>MINESWEEPER</SectionTitle>
        <CounterHeaderContainer maxRows={maxRows}>
          <NumberDisplay value={bombCounter} />
          <EmojiButton
            emoji={emoji}
            pressed={emojiPressed}
            onPress={handleEmojiPress}
            onPressIn={handleEmojiPressIn}
            onPressOut={handleEmojiPressOut}
          />
          <NumberDisplay value={time} />
        </CounterHeaderContainer>
        <Spacer />
        <Board
          cells={cells}
          rowSize={maxRows}
          colSize={maxCols}
          cellSize={CELL_SIZE}
          onCellPress={handleCellPress}
          onCellPressIn={handleCellPressIn}
          onCellPressOut={handleCellPressOut}
          onLongCellPress={handleLongCellPress}
        />
      </ContentContainer>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.PINK};
`;

const ContentContainer = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const NavigationHeaderContainer = styled.View`
  margin-top: ${Platform.OS === 'ios' ? '25px' : '0'};
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const BackButtonContainer = styled.TouchableOpacity`
  padding: 5px;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  color: ${Colors.PINK};
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${Colors.MUSTARD};
`;

const Spacer = styled.View`
  height: 10px;
`;

const CounterHeaderContainer = styled.View<CounterHeaderProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.PINK_600};
  border-width: 3px;
  border-top-color: ${Colors.PINK_100};
  border-left-color: ${Colors.PINK_100};
  border-right-color: ${Colors.PINK_800};
  border-bottom-color: ${Colors.PINK_800};
  width: ${(props) => props.maxRows * CELL_SIZE};
`;
