import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { grid } from '../../styles';

function MainContainer({
  style,
  children,
  ...rest
}: ViewProps & { children: React.ReactNode }) {
  return (
    <View {...rest} style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: grid.Gutter,
  },
});

export default MainContainer;
