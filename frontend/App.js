import React from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import QuestionPage from './pages/QuestionPage'

const TriviaCast = StackNavigator({
    Main: {screen: MainPage},
    Login: {screen: LoginPage},
  },
  {headerMode: 'none'}

);

export default class App extends React.Component {
  render() {
        return <TriviaCast/>;
  }
}
