import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Colors } from '../theme/Colors';

import { ThrottledTouchableOpacity } from '~/components/common/ThrottledTouchableOpacity';
import { Navigation } from 'react-native-navigation';
import { ScreenIds } from '~/navigation';

export interface HomeProps {
  componentId: string;
}

interface PushedProps {
  bombs: number;
  maxRows: number;
  maxCols: number;
}

const HomeScreen: React.FC<HomeProps> = (props) => {
  const { componentId } = props;
  const handleGamePress = useCallback(() => {
    return Navigation.push<PushedProps>(componentId, {
      component: {
        name: ScreenIds.GAME,
        passProps: {
          bombs: 10,
          maxRows: 10,
          maxCols: 10,
        },
      },
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.sectionTitle}>MINESWEEPER</Text>
        <ThrottledTouchableOpacity onPress={handleGamePress}>
          <Text>START</Text>
        </ThrottledTouchableOpacity>
      </SafeAreaView>
    </>
  );
};

/*
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PINK,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.MUSTARD,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.LIGHT_BLUE,
  },
});

export default HomeScreen;
