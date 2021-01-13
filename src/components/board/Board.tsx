import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Cell } from '~/components/board/Cell';
import { CellType } from '~/types/CellTypes';

/*
 * Types
 */

type BoardProps = {
  cells: CellType[][];
  rowSize: number;
  colSize: number;
  cellSize: number;
  onCellPressIn: () => void;
  onCellPressOut: () => void;
  onCellPress(rowParam: number, celParam: number): () => void;
  onLongCellPress(rowParam: number, celParam: number): () => void;
};

type ContainerProps = {
  boardWidth: number;
  boardHeight: number;
};

export const Board: React.FC<BoardProps> = ({
  cells,
  rowSize,
  colSize,
  cellSize,
  onCellPress,
  onCellPressIn,
  onCellPressOut,
  onLongCellPress,
}) => {
  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          isRed={cell.red}
          onCellPressIn={onCellPressIn}
          onCellPressOut={onCellPressOut}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
          onCellPress={onCellPress}
          onLongCellPress={onLongCellPress}
        />
      )),
    );
  };

  const boardWidth = cellSize * colSize;
  const boardHeight = cellSize * rowSize;

  return (
    <Container boardWidth={boardWidth} boardHeight={boardHeight}>
      {renderCells()}
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled(View)<ContainerProps>`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${(props) => props.boardWidth};
  height: ${(props) => props.boardHeight};
  background-color: red;
`;
