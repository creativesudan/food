import React from 'react';
import { View, StyleSheet, PickerProps } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { colors, grid } from '../styles';

interface Props extends PickerProps {
  style2?: boolean;
  style?: any;
  children: any;
}
const SelectOption = ({
  style2,
  style,
  onValueChange,
  selectedValue,
  ...props
}: Props) => (
  <View style={[styles.raisedSelect, style2 && styles.style2, style]}>
    <Picker
      selectedValue={selectedValue}
      style={styles.container}
      onValueChange={onValueChange}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    color: colors.grey1,
    fontSize: 12,
  },
  style2: {
    elevation: 0,
    borderBottomWidth: 2,
    borderColor: colors.grey2,
  },
  raisedSelect: {
    backgroundColor: colors.white,
    borderRadius: grid.Round,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default SelectOption;
