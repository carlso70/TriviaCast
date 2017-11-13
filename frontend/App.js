//test
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import GameMenu from './pages/GameMenu'
import SettingsPage from './pages/SettingsPage'
import HighScorePage from './pages/HighScorePage'
import ChangePassPage from './pages/ChangePassPage'
import Lobby from './pages/Lobby'
import Game from './pages/QuestionPage'
import AnswerPage from './pages/AnswerPage';
import ForgotPage from './pages/ForgotPage'

const TriviaCast = StackNavigator({
    Main: {screen: MainPage},
    Login: {screen: LoginPage},
    Settings: {screen: SettingsPage},
    HighScores: {screen: HighScorePage},
    GameMenu: {screen: GameMenu},
    Settings: {screen: SettingsPage},
    Lobby: {screen: Lobby},
    Game: {screen: Game},
    ChangePassword: {screen: ChangePassPage},
    Answer: { screen: AnswerPage},
    ForgotPassword:{screen: ForgotPage},
  },
  {headerMode: 'none'}

);

export default class App extends React.Component {
  render() {
        return <TriviaCast/>;
  }
}
