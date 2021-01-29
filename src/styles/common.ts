import { StyleSheet, StatusBar, Platform } from 'react-native';

import colors from './colors';

const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: 16,
  },
  headerStyle: {
    backgroundColor: colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
});
export default commonStyles;
