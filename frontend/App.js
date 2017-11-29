// import react native to handle navigation
import React from 'react';
import { StackNavigator } from 'react-navigation';

// import all pages that we will be using in order to add them to the stack navigator
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
import QuestionPage from './pages/QuestionPage'
import ChangeAva from './pages/ChangeAvatar'

// initalize stack navigator
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
    QuestionPage: {screen: QuestionPage },
    Answer: { screen: AnswerPage},
    ForgotPassword:{screen: ForgotPage},
    ChangeAvatar: {screen: ChangeAva}
  },
  {headerMode: 'none'}

);

// export main class
export default class App extends React.Component {
  render() {
        return <TriviaCast/>;
  }
}
