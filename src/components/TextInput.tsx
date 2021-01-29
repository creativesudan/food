import React from 'react';
import { View, Platform, StyleSheet, TextInput } from 'react-native';

import { colors } from '../styles';

const RNSTextInput = ({
  type,
  dark,
  style,
  placeholderTextColor,
  ...restProps
}) => {
  const finalStyle = [
    styles.default,
    type === 'bordered' && styles.bordered,
    dark && styles.dark,
    style && style,
  ];

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={placeholderTextColor || colors.white}
        underlineColorAndroid="white"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        style={finalStyle}
      />
      {Platform.OS === 'ios' && <View style={styles.iosMsg} />}
    </View>
  );
};

const HEIGHT = 40;

const styles = StyleSheet.create({
  iosMsg: { height: 0.5, backgroundColor: 'white' },
  wrapper: {
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  default: {
    height: HEIGHT,
    color: 'white',
    ...Platform.select({
      android: {
        paddingLeft: 5,
        opacity: 0.9,
      },
    }),
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  dark: {
    color: colors.gray,
  },
  primary: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
});

export default RNSTextInput;
