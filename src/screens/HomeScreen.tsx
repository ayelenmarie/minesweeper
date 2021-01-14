import React, { useCallback } from 'react';

import { Navigation } from 'react-native-navigation';
import { ScreenIds } from '~/navigation';
import { GameType } from '~/types/GameTypes';
import { HomeView } from '~/views/HomeView';

export interface HomeProps {
  componentId: string;
}

interface PushedProps {
  bombs: number;
  maxRows: number;
  maxCols: number;
  gameType: GameType;
}

const HomeScreen: React.FC<HomeProps> = ({ componentId }) => {
  const handleEasyPress = useCallback(() => {
    return Navigation.push<PushedProps>(componentId, {
      component: {
        name: ScreenIds.GAME,
        passProps: {
          bombs: 5,
          maxRows: 10,
          maxCols: 10,
          gameType: GameType.easy,
        },
      },
    });
  }, []);

  const handleMediumPress = useCallback(() => {
    return Navigation.push<PushedProps>(componentId, {
      component: {
        name: ScreenIds.GAME,
        passProps: {
          bombs: 10,
          maxRows: 10,
          maxCols: 10,
          gameType: GameType.medium,
        },
      },
    });
  }, []);

  const handleHardPress = useCallback(() => {
    return Navigation.push<PushedProps>(componentId, {
      component: {
        name: ScreenIds.GAME,
        passProps: {
          bombs: 25,
          maxRows: 12,
          maxCols: 12,
          gameType: GameType.hard,
        },
      },
    });
  }, []);

  return (
    <HomeView
      onEasyPress={handleEasyPress}
      onMediumPress={handleMediumPress}
      onHardPress={handleHardPress}
    />
  );
};

export default HomeScreen;
