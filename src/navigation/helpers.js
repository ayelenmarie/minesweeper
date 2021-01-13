import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ThemeProvider } from '~/theme/ThemeProvider';

/**
 * Helpers
 */

export function registerScreen(screenId, ScreenComponent) {
  return Navigation.registerComponent(screenId, () => ScreenComponent);
}
