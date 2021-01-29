import React from 'react';

import { TouchableOpacity, View, Text, ViewStyle } from 'react-native';

import { colors } from '../styles';

interface Props {
  items: Array<any>;
  selectedIndex: number;
  onChange: (arg0: number) => void;
  style: ViewStyle;
  underline?: boolean;
}

export default function RNSRadioGroup({
  items,
  selectedIndex,
  onChange,
  style,
  underline,
}: Props) {
  return (
    <View style={[styles.container, underline && styles.underline, style]}>
      {items &&
        items.map((item, index) => {
          let isActive = false;
          if (selectedIndex !== undefined && selectedIndex === index) {
            isActive = true;
          }

          // TODO
          // let activeStyle = styles.itemActive;
          // if (underline) {
          //   activeStyle = styles.itemActiveUnderline;
          // }

          let activeTextStyle = styles.textActive;
          if (underline) {
            activeTextStyle = styles.textActiveUnderline;
          }

          return (
            <TouchableOpacity
              onPress={() => onChange(index)}
              key={item.id || item}
              // style={[
              //   styles.item,
              //   underline && styles.itemUnderline,
              //   isActive && activeStyle,
              // ]}
            >
              <Text
                style={[
                  styles.text,
                  underline && styles.textUnderline,
                  isActive && activeTextStyle,
                ]}
              >
                {item.value || item}
              </Text>
              {underline && isActive && <View style={styles.activeClass} />}
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = {
  activeClass: {
    height: 5,
    borderBottomColor: colors.primary,
    borderBottomWidth: 3,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  underline: {
    borderWidth: 0,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  itemUnderline: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e3e3e3',
  },
  itemActive: {
    backgroundColor: colors.primary,
  },
  itemActiveUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  text: {
    color: colors.primary,
  },
  textUnderline: {
    color: '#a6a6a6',
  },
  textActive: {
    color: colors.white,
  },
  textActiveUnderline: {
    color: colors.primary,
  },
};
