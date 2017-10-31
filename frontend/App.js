import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import MainMenu from './pages/MainMenu'
import SettingsPage from './pages/SettingsPage'
import Lobby from './pages/Lobby.js'

const TriviaCast = StackNavigator({
    Main: {screen: MainPage},
    Login: {screen: LoginPage},
    GameMenu: {screen: MainMenu},
    Settings: {screen: SettingsPage},
    Lobby: {screen: Lobby}
  },
  {headerMode: 'none'}

);

export default class App extends React.Component {
  render() {
        return <TriviaCast/>;
  }
}
