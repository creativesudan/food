// import { Colors, Assets } from 'react-native-ui-lib';
import { Dimensions } from 'react-native';

import colors from './colors';
import fonts from './fonts';
import commonStyles from './common';
import grid from './config';

const { width } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;

// Colors.loadColors(colors);


// Assets.loadAssetsGroup('images', {});

// Assets.loadAssetsGroup('icons', {});

const scale = (size: number): number => (width / guidelineBaseWidth) * size;

export { colors, fonts, scale, commonStyles, grid };
