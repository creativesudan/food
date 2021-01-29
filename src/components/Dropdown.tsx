import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text } from 'react-native';

import { colors } from '../styles';

class RNSDropDown extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    placeholder: 'Please Select...',
    selectedIndex: -1,
    color: colors.primary,
    borderColor: colors.primary,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    isOpened: false,
  };

  _openModal = () => {
    this.setState({ isOpened: true });
  };

  _closeModal = () => {
    this.setState({ isOpened: false });
  };

  render() {
    const {
      items,
      color,
      onSelect,
      style,
      borderColor,
      selectedIndex,
      placeholder,
    } = this.props;
    return (
      <ModalDropdown
        options={items}
        onDropdownWillShow={this._openModal}
        onDropdownWillHide={this._closeModal}
        dropdownStyle={styles.dropdownStyle}
        adjustFrame={(params) => {
          // eslint-disable-next-line no-param-reassign
          params.left = 0;
          // eslint-disable-next-line no-param-reassign
          params.right = 0;
          return params;
        }}
        renderRow={(text) => (
          <View style={styles.dropdownWrapper}>
            <Text
              style={{
                color,
              }}
            >
              {text}
            </Text>
          </View>
        )}
        onSelect={onSelect}
      >
        <View
          style={[
            styles.container,
            style && style,
            {
              borderColor,
            },
          ]}
        >
          <Text
            style={{
              color,
            }}
          >
            {selectedIndex > -1 && items[selectedIndex]
              ? items[selectedIndex]
              : placeholder}
          </Text>
          <Icon
            name={this.state.isOpened ? 'angle-up' : 'angle-down'}
            color={color}
            size={20}
            style={styles.icon}
          />
        </View>
      </ModalDropdown>
    );
  }
}

const styles = {
  dropdownWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
  },
  dropdownStyle: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
};

export default RNSDropDown;
