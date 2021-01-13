import { CellType, CellValue, CellState } from '~/types/CellTypes';

/*
 * Select all adjacent cells function
 */

const grabAllAdjacentCells = (
  cells: CellType[][],
  rowParam: number,
  colParam: number,
  maxRows: number,
  maxCols: number,
): {
  topLeftCell: CellType | null;
  topCell: CellType | null;
  topRightCell: CellType | null;
  leftCell: CellType | null;
  rightCell: CellType | null;
  bottomLeftCell: CellType | null;
  bottomCell: CellType | null;
  bottomRightCell: CellType | null;
} => {
  const topLeftCell = rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < maxCols - 1 ? cells[rowParam - 1][colParam + 1] : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell = colParam < maxCols - 1 ? cells[rowParam][colParam + 1] : null;
  const bottomLeftCell =
    rowParam < maxRows - 1 && colParam > 0 ? cells[rowParam + 1][colParam - 1] : null;
  const bottomCell = rowParam < maxRows - 1 ? cells[rowParam + 1][colParam] : null;
  const bottomRightCell =
    rowParam < maxRows - 1 && colParam < maxCols - 1 ? cells[rowParam + 1][colParam + 1] : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

/*
 * Generate Cells function
 */

export const generateCells = (bombs: number, maxRows: number, maxCols: number): CellType[][] => {
  let cells: CellType[][] = [];

  // Generates a two dimensional array of cells with its initial state

  for (let row = 0; row < maxRows; row++) {
    cells.push([]);
    for (let col = 0; col < maxCols; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.closed,
      });
    }
  }

  // Randomly place mines
  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    const randomRow = Math.floor(Math.random() * maxRows);
    const randomCol = Math.floor(Math.random() * maxCols);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }

          return cell;
        }),
      );
      bombsPlaced++;
    }
  }

  // Calculate the number of bombs surrounding the cell

  for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
    for (let colIndex = 0; colIndex < maxCols; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];

      if (currentCell.value === CellValue.bomb) {
        continue;
      }

      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
      } = grabAllAdjacentCells(cells, rowIndex, colIndex, maxRows, maxCols);

      let numberOfBombs = 0;

      if (topLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (leftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (rightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }

  return cells;
};

/*
 * Open Adjacent Cells function
 */

export const openAdjacentCells = (
  cells: CellType[][],
  rowParam: number,
  colParam: number,
  maxRows: number,
  maxCols: number,
): CellType[][] => {
  const currentCell = cells[rowParam][colParam];

  if (currentCell.state === CellState.revealed || currentCell.state === CellState.flagged) {
    return cells;
  }

  let newCells = cells.slice();
  newCells[rowParam][colParam].state = CellState.revealed;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabAllAdjacentCells(cells, rowParam, colParam, maxRows, maxCols);

  if (topLeftCell?.state === CellState.closed && topLeftCell.value !== CellValue.bomb) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam - 1, colParam - 1, maxRows, maxCols);
    } else {
      newCells[rowParam - 1][colParam - 1].state = CellState.revealed;
    }
  }

  if (topCell?.state === CellState.closed && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam - 1, colParam, maxRows, maxCols);
    } else {
      newCells[rowParam - 1][colParam].state = CellState.revealed;
    }
  }

  if (topRightCell?.state === CellState.closed && topRightCell.value !== CellValue.bomb) {
    if (topRightCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam - 1, colParam + 1, maxRows, maxCols);
    } else {
      newCells[rowParam - 1][colParam + 1].state = CellState.revealed;
    }
  }

  if (leftCell?.state === CellState.closed && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam, colParam - 1, maxRows, maxCols);
    } else {
      newCells[rowParam][colParam - 1].state = CellState.revealed;
    }
  }

  if (rightCell?.state === CellState.closed && rightCell.value !== CellValue.bomb) {
    if (rightCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam, colParam + 1, maxRows, maxCols);
    } else {
      newCells[rowParam][colParam + 1].state = CellState.revealed;
    }
  }

  if (bottomLeftCell?.state === CellState.closed && bottomLeftCell.value !== CellValue.bomb) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam + 1, colParam - 1, maxRows, maxCols);
    } else {
      newCells[rowParam + 1][colParam - 1].state = CellState.revealed;
    }
  }

  if (bottomCell?.state === CellState.closed && bottomCell.value !== CellValue.bomb) {
    if (bottomCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam + 1, colParam, maxRows, maxCols);
    } else {
      newCells[rowParam + 1][colParam].state = CellState.revealed;
    }
  }

  if (bottomRightCell?.state === CellState.closed && bottomRightCell.value !== CellValue.bomb) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam + 1, colParam + 1, maxRows, maxCols);
    } else {
      newCells[rowParam + 1][colParam + 1].state = CellState.revealed;
    }
  }

  return newCells;
};
