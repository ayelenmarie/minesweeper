import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';

import {Colors} from '~/theme/Colors';
import {WINDOW_WIDTH} from '~/styles/helpers';
import {registerScreen} from './helpers';

export * from './helpers';

/**
 * Screen IDs
 * These will be imported to then navigate to each one
 */

export const ScreenIds = {
  HOME: 'HOME',
};

/**
 * This functions register every screen
 *
 * We use `require` instead of `import` so that we avoid dependency cycles
 */

export function init() {
  // Register screens

  registerScreen(ScreenIds.HOME, require('~/screens/HomeScreen').default);
}

/**
 * Helpers
 */

export function setDefaultNavigationOptions() {
  const animations = Platform.select({
    android: {
      push: {
        content: {
          waitForRender: true,
          translationX: {
            from: WINDOW_WIDTH,
            to: 0,
            duration: 300,
            interpolation: {
              type: 'spring',
            },
          },
        },
      },
      pop: {
        content: {
          translationX: {
            from: 0,
            to: WINDOW_WIDTH,
            duration: 300,
            interpolation: {
              type: 'spring',
            },
          },
        },
      },
    },
  });

  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      drawBehind: false,
      style: Platform.OS === 'ios' ? 'dark' : 'light',
    },

    topBar: {
      visible: false,
      height: 0,
    },

    layout: {
      orientation: 'portrait',
      componentBackgroundColor: Colors.PINK,
    },

    animations,
  });
}
