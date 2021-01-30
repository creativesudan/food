/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppView from './src/modules/AppView';
// import { colors } from 'react-native-elements';
import { colors } from './src/styles';
import store from "./src/redux/store";
import { Provider } from "react-redux";

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer>
        <AppView />
      </NavigationContainer>
    </Provider>
  );
};

export default App;