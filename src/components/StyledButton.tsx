import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNButton } from 'react-native-elements';
import { colors, grid } from '../styles';

function ButtonBg({
  primary,
  transparent,
  primaryLight,
  secondary,
  risk,
  riskFill,
  white,
  whiteDark,
  whiteGreen,
  grey,
  lg,
  md,
  mdR,
  lgR,
  flat,
  link,
  disable,
}) {
  return [
    // style && style,
    primary && styles.primary,
    transparent && styles.transparent,
    riskFill && styles.riskFill,
    primaryLight && styles.primaryLight,
    secondary && styles.secondary,
    risk && styles.risk,
    white && styles.white,
    whiteGreen && styles.white,
    whiteDark && styles.white,
    grey && styles.grey,
    link && styles.link,
    lg && styles.lg,
    md && styles.md,
    mdR && styles.mdR,
    lgR && styles.lgR,
    flat && styles.flat,
    disable && styles.disable,
  ];
}

function TextColor({
  primary,
  riskFill,
  primaryLight,
  secondary,
  risk,
  white,
  whiteGreen,
  whiteDark,
  grey,
  lg,
  link,
  disable,
}) {
  return [
    // style && style,
    primary && styles.whiteColor,
    disable && styles.whiteColor,
    primaryLight && styles.whiteTxt,
    secondary && styles.veryDark,
    risk && styles.riskColor,
    riskFill && styles.whiteColor,
    white && styles.whiteTxt,
    whiteGreen && styles.defaultText,
    whiteDark && styles.veryDark,
    grey && styles.veryDark,
    link && styles.linkText,
    lg && styles.lgtext,
    // md && styles.mdtext,
  ];
}

function BtnShape({ flat, noBorder, outline }) {
  return [
    // style && style,
    flat && styles.flatShape,
    noBorder && styles.noBorder,
    outline && styles.outline,
  ];
}

export function Button({ ...props }) {
  const buttonBgStyle = [styles.default, ...ButtonBg(props)];
  const titleTxtStyle = [styles.defaultText, ...TextColor(props)];
  const BtnShapeStyle = [styles.curve, ...BtnShape(props)];
  return (
    <RNButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      buttonStyle={buttonBgStyle}
      titleStyle={titleTxtStyle}
      containerStyle={BtnShapeStyle}
    />
  );
  // return <RNButton {...props} buttonStyle={buttonBgStyle}  titleStyle={{color: colors.secondary}}/>;
}

export function IconButton(props) {
  const buttonBgStyle = [styles.rounded, ...ButtonBg(props)];
  const titleTxtStyle = [styles.defaultText, ...TextColor(props)];
  const BtnShapeStyle = [styles.greyOutline, ...BtnShape(props)];
  return (
    <RNButton
      {...props}
      buttonStyle={buttonBgStyle}
      titleStyle={titleTxtStyle}
      containerStyle={BtnShapeStyle}
    />
  );
}

const styles = StyleSheet.create({
  disable: {
    backgroundColor: '#9196A9',
  },
  transparent:{
    backgroundColor: 'transparent'
  },
  grey: {
    backgroundColor: colors.veryLight
  },
  default: {
    backgroundColor: colors.secondary1,
    height: grid.smHeight,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  defaultText: {
    fontSize: 14,
    color: colors.secondary,
  },
  riskFill: {
    backgroundColor: '#fc2125',
  },
  risk: {
    backgroundColor: colors.risk1,
  },
  riskColor: {
    color: colors.risk,
  },
  link: {
    backgroundColor: 'transparent',
  },
  linkText: {
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  veryDark: {
    color: colors.veryDark,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryLight: {
    backgroundColor: colors.primaryLight,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  whiteColor: {
    color: colors.white,
  },
  white: {
    backgroundColor: colors.white,
    // borderWidth: 1,
    borderColor: '#F3E6E6'
  },
  whiteTxt: {
    color: colors.primary,
  },
  lg: {
    height: grid.lgHeight,
    paddingHorizontal: 20,
  },
  lgR: {
    height: grid.lgHeight+10,
    width: grid.lgHeight+10,
  },
  md: {
    height: grid.mdHeight,
    paddingHorizontal: 15,
  },
  mdR: {
    height: grid.mdHeight-4,
    width: grid.mdHeight-4
  },
  lgtext: {
    fontSize: 16,
  },
  curve: {
    borderRadius: 100,
  },
  flatShape: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: 100,
  },
  greyOutline: {
    borderWidth: 1,
    borderColor: colors.greyOutline,
    borderRadius: 100,
  },
  outline:{
    borderWidth: 1,
    borderColor: colors.greyOutline,
  },
  noBorder: {
    borderWidth: 0,
  },
});
