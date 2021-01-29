/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppView from './src/modules/AppView';
// import { colors } from 'react-native-elements';
import { colors } from './src/styles';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer>
        <AppView/>
      </NavigationContainer>
    </>
  );
};

export default App;