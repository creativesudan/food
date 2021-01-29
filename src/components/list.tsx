import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './StyledText';
import { colors } from '../styles';

function List(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <View {...props} style={styles.List}>
      <View style={styles.bullets} />
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  List: {
    flexDirection: 'row',
    paddingRight: 10,
    marginVertical: 3,
  },
  bullets: {
    marginTop: 6,
    width: 6,
    height: 6,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: colors.veryDark,
    borderWidth: 1,
  },
  text: {
    paddingLeft: 10,
    color: colors.veryDark,
    fontSize: 12,
    lineHeight: 18,
  },
});

export default List;
