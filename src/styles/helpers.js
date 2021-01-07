import {Dimensions} from 'react-native';

/**
 * Constants
 */

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const portraitDeviceHeight = Math.max(WINDOW_WIDTH, WINDOW_HEIGHT);
const portraitDeviceWidth = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT);

/**
 * Constants
 */
export {portraitDeviceHeight, portraitDeviceWidth, WINDOW_WIDTH, WINDOW_HEIGHT};
