import React, { useCallback } from 'react';

import { Navigation } from 'react-native-navigation';
import { GameView } from '~/views/GameView';

/*
 * Types
 */

type GameProps = {
  componentId: string;
  bombs: number;
  maxRows: number;
  maxCols: number;
};

const GameScreen: React.FC<GameProps> = ({ componentId, bombs, maxRows, maxCols }) => {
  const handleBackPress = useCallback(() => {
    return Navigation.pop(componentId);
  }, []);

  return (
    <GameView onBackPress={handleBackPress} bombs={bombs} maxRows={maxRows} maxCols={maxCols} />
  );
};

export default GameScreen;
