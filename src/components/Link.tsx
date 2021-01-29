import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './StyledText';
import { colors } from '../styles';

function Link(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Text {...props} style={styles.Link}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  Link: {
    color: colors.primary,
    fontSize: 12,
    lineHeight: 18,
  },
});

export default Link;
