import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import MainMenu from './pages/MainMenu'
import SettingsPage from './pages/SettingsPage'
import HighScorePage from './pages/HighScorePage'

const TriviaCast = StackNavigator({
    Main: {screen: MainPage},
    Login: {screen: LoginPage},
    GameMenu: {screen: MainMenu},
    Settings: {screen: SettingsPage},
    HighScores: {screen: HighScorePage}
  },
  {headerMode: 'none'}

);

export default class App extends React.Component {
  render() {
        return <TriviaCast/>;
  }
}
