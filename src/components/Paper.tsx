import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, grid } from '../styles';

function Paper(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <View {...props}>
      <View style={styles.Paper}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  Paper: {
    backgroundColor: colors.white,
    borderRadius: grid.Round*2,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default Paper;
