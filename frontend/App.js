import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import GameMenu from './pages/GameMenu'
import SettingsPage from './pages/SettingsPage'
import Lobby from './pages/Lobby'
import Game from './pages/QuestionPage'

const TriviaCast = StackNavigator({
    Main: {screen: MainPage},
    Login: {screen: LoginPage},
    GameMenu: {screen: GameMenu},
    Settings: {screen: SettingsPage},
    Lobby: {screen: Lobby},
    Game: {screen: Game}
  },
  {headerMode: 'none'}

);

export default class App extends React.Component {
  render() {
        return <TriviaCast/>;
  }
}
