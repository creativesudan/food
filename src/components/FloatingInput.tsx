import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  KeyboardType,
  TextInputProps,
} from 'react-native';
import { colors } from '../styles';

interface Props {
  attrName: string;
  title: string;
  value: string;
  updateMasterState?: (attrName: string, updatedValue: string) => void;
  onChange?: (value: string) => void;
  keyboardType: KeyboardType;
  titleActiveSize: number; // to control size of title when field is active
  titleInActiveSize: number; // to control size of title when field is inactive
  titleActiveColor: string;
  titleInactiveColor: string;
  otherTextInputProps?: TextInputProps;
  BorderInActiveColor: string;
  BorderActiveColor: string;
  textInputStyles: object;
  containStyles: object;
}

interface State {
  isFieldActive: boolean;
}

export default class FloatingInput extends Component<Props, State> {
  position: any;

  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 10,
    titleInActiveSize: 14,
    titleActiveColor: colors.grey1,
    titleInactiveColor: '#9196A9',
    BorderInActiveColor: '#9196A9',
    BorderActiveColor: colors.grey1,
    textInputStyles: {},
    containStyles: {},
  };

  constructor(props: Props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: value !== '',
    };
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  _onChangeText = (updatedValue: string) => {
    const { attrName, updateMasterState, onChange } = this.props;
    if (updateMasterState) updateMasterState(attrName, updatedValue);
    if (onChange) onChange(updatedValue);
  };

  _returnAnimatedBorderStyles = () => {
    const { isFieldActive } = this.state;
    const { BorderActiveColor, BorderInActiveColor } = this.props;

    return {
      borderBottomColor: isFieldActive
        ? BorderActiveColor
        : BorderInActiveColor,
    };
  };

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const {
      titleActiveColor,
      titleInactiveColor,
      titleActiveSize,
      titleInActiveSize,
    } = this.props;

    return {
      top: this.position.interpolate({
        inputRange: [0, 1.5],
        outputRange: [12, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    };
  };

  render() {
    return (
      <View
        style={[
          Styles.container,
          this.props.containStyles,
          this._returnAnimatedBorderStyles(),
        ]}
      >
        <Animated.Text
          style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
        >
          {this.props.title}
        </Animated.Text>
        <TextInput
          value={this.props.value}
          style={[Styles.textInput, this.props.textInputStyles]}
          underlineColorAndroid="transparent"
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChangeText={this._onChangeText}
          keyboardType={this.props.keyboardType}
          {...this.props.otherTextInputProps}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    // borderBottomColor: '#f00',
    height: 42,
    paddingHorizontal: 0,
    backgroundColor: colors.white,
  },
  textInput: {
    marginTop: 6,
    // fontFamily: 'Avenir-Medium',
    height: 42,
    fontSize: 14,
    color: colors.veryDark,
    paddingLeft:0,
  },
  titleStyles: {
    position: 'absolute',
    // fontFamily: 'Avenir-Medium',
    fontSize: 10,
    // marginTop: 4,
    // left: 4,
    // paddingHorizontal: 6,
  },
});
