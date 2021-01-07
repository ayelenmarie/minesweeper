import React from 'react';
import {Navigation} from 'react-native-navigation';

/**
 * Helpers
 */

export function registerScreen(screenId, ScreenComponent) {
  return Navigation.registerComponent(screenId, () => ScreenComponent);
}
