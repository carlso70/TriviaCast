//test
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import GameMenu from './pages/GameMenu'
import SettingsPage from './pages/SettingsPage'
import HighScorePage from './pages/HighScorePage'
import ForgotPassPage from './pages/ForgotPassword.js'
import Lobby from './pages/Lobby'
import Game from './pages/QuestionPage'

const TriviaCast = StackNavigator({
    Main: {screen: MainPage},
    Login: {screen: LoginPage},
    Settings: {screen: SettingsPage},
    HighScores: {screen: HighScorePage},
    GameMenu: {screen: GameMenu},
    Settings: {screen: SettingsPage},
<<<<<<< HEAD
    ForgotPassword: {screen: ForgotPassPage},
    //Lobby: {screen: Lobby}.screen,
    
=======
    Lobby: {screen: Lobby},
    Game: {screen: Game}
>>>>>>> 2c687b69e8dd7199d463ec531e8f8ddb9299465e
  },
  {headerMode: 'none'}

);

export default class App extends React.Component {
  render() {
        return <TriviaCast/>;
  }
}
