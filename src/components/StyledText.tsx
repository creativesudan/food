/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { colors } from '../styles';

function applyGeneralStyles({
  style,
  bold,
  h1,
  h2,
  h3,
  h4,
  p,
  small,
  i,
  subtitle1,
  subtitle2,
  title,
  caption,
  light,
  white,
  underline,
  hCenter,
  lineThrough,
  color,
  size,
  label,
}: any) {
  return [
    style,
    bold && styles.bold,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    h4 && styles.h4,
    p && styles.p,
    small && styles.small,
    i && styles.i,
    label && styles.label,
    subtitle1 && styles.subtitle1,
    subtitle2 && styles.subtitle2,
    title && styles.title,
    caption && styles.caption,
    light && styles.light,
    white && styles.white,
    underline && styles.underline,
    hCenter && { textAlign: 'center'},
    lineThrough && styles.lineThrough,
    color && { color },
    size && { fontSize: size },
  ];
}

export function Text(props: any) {
  const finalStyle = [styles.default, ...applyGeneralStyles(props)];

  return <RNText {...props} style={finalStyle} />;
}

export function Title(props: any) {
  const finalStyle = [
    styles.default,
    styles.title,
    ...applyGeneralStyles(props),
  ];
  return <RNText {...props} style={finalStyle} />;
}

export function Caption(props: any) {
  const finalStyle = [
    styles.default,
    styles.caption,
    ...applyGeneralStyles(props),
  ];

  return <RNText {...props} style={finalStyle} />;
}

// h1 = 24
// h2 = 18
// h3 = 16
// h4 = 14

// p = 12
// subtitle1 = 14

const styles = StyleSheet.create({
  h1: {
    // fontFamily: fonts.primaryBold,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    // color: colors.veryDark,
  },
  h2: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    // color: colors.veryDark,
  },
  h3: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    // color: colors.veryDark,
  },
  h4: {
    fontSize: 16,
    // fontWeight: '700',
    // color: colors.veryDark,
  },
  h5: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
    // color: colors.veryDark,
  },
  p: {
    fontSize: 12,
    lineHeight: 18,
    // color: colors.veryDark,
  },
  small: {
    fontSize: 10,
    lineHeight: 16,
    // color: colors.veryDark,
  },
  subtitle1: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
    // color: colors.veryDark,
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    // color: colors.veryDark,
  },
  default: {
    fontWeight: '400',
    // color: colors.veryDark,
  },
  bold: {
    fontWeight: '700',
  },
  light: {
    fontWeight: '300',
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: '#9196A9',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  i: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.gray,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  white: {
    color: colors.white,
  },
});
