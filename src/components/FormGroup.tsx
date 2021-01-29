import React from 'react';
import { View, StyleSheet } from 'react-native';

function FormGroup(props) {
  return <View style={styles.FormGroup}>{props.children}</View>;
}

const styles = StyleSheet.create({
  FormGroup: {
    marginVertical: 8,
  },
});

export default FormGroup;
