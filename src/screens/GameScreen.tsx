import React, { useCallback } from 'react';

import { Navigation } from 'react-native-navigation';
import { GameType } from '~/types/GameTypes';
import { GameView } from '~/views/GameView';

/*
 * Types
 */

type GameProps = {
  componentId: string;
  bombs: number;
  maxRows: number;
  maxCols: number;
  gameType: GameType;
};

const GameScreen: React.FC<GameProps> = ({ componentId, bombs, maxRows, maxCols, gameType }) => {
  const handleBackPress = useCallback(() => {
    return Navigation.pop(componentId);
  }, []);

  return (
    <GameView
      onBackPress={handleBackPress}
      bombs={bombs}
      maxRows={maxRows}
      maxCols={maxCols}
      gameType={gameType}
    />
  );
};

export default GameScreen;
