/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { ColorByNumber } from '~/constants/neighboursColor';
import { CellState, CellValue } from '~/types/CellTypes';
import { Colors } from '../../theme/Colors';

/*
 * Types
 */

interface CellProps {
  state: CellState;
  value: CellValue;
  row: number;
  col: number;
  isRed?: boolean;
  onCellPressIn: () => void;
  onCellPressOut: () => void;
  onCellPress(rowParam: number, colParam: number): () => void;
  onLongCellPress(rowParam: number, colParam: number): () => void;
}

type ContainerProps = {
  isRevealed: boolean;
  isRed?: boolean;
};

type NumberProps = {
  numberColor: string | null;
};

export const Cell: React.FC<CellProps> = ({
  state,
  value,
  row,
  col,
  isRed,
  onCellPress,
  onCellPressIn,
  onCellPressOut,
  onLongCellPress,
}) => {
  const isRevealed = state === CellState.revealed;
  const isFlagged = state === CellState.flagged;
  const numberColor = ColorByNumber[value];

  const renderContent = (): React.ReactNode => {
    if (isRevealed) {
      if (value === CellValue.bomb) {
        if (isRed) {
          return <Emoji source={require('~/images/explosion.png')} />;
        }
        return <Emoji source={require('~/images/bomb.png')} />;
      } else if (value === CellValue.none) {
        return null;
      }

      return <Number numberColor={numberColor}>{value}</Number>;
    } else if (isFlagged) {
      return <Emoji source={require('~/images/flag.png')} />;
    }

    return null;
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={onCellPressIn}
      onPressOut={onCellPressOut}
      onPress={onCellPress(row, col)}
      onLongPress={onLongCellPress(row, col)}>
      <Container isRevealed={isRevealed} isRed={isRed}>
        {renderContent()}
      </Container>
    </TouchableWithoutFeedback>
  );
};

/*
 * Styles
 */

const Container = styled.View<ContainerProps>`
  background-color: ${(props) => (props.isRed ? Colors.PINK : Colors.PINK_500)};
  border-width: ${(props) => (props.isRevealed ? '1px' : '3px')};
  border-top-color: ${(props) => (props.isRevealed ? Colors.PINK_800 : Colors.PINK_100)};
  border-left-color: ${(props) => (props.isRevealed ? Colors.PINK_800 : Colors.PINK_100)};
  border-right-color: ${(props) => (props.isRevealed ? Colors.PINK_800 : Colors.PINK_800)};
  border-bottom-color: ${(props) => (props.isRevealed ? Colors.PINK_800 : Colors.PINK_800)};
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.Image`
  width: 15px;
  height: 15px;
`;

const Number = styled.Text<NumberProps>`
  color: ${(props) => props.numberColor};
  font-weight: 600;
`;
