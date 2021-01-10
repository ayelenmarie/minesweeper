import {Navigation} from 'react-native-navigation';

import {
  init as initNavigation,
  setDefaultNavigationOptions,
  ScreenIds,
} from './src/navigation';

initNavigation();

Navigation.events().registerAppLaunchedListener(() => {
  setDefaultNavigationOptions();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: ScreenIds.GAME,
            },
          },
        ],
      },
    },
    animate: false,
  });
});
