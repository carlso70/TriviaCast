import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';




import MainPage from './pages/MainPage.js'
import LoginPage from './pages/LoginPage.js'
import MainMenu from './pages/MainMenu.js'

// class MainPage extends Component{
//   static navigationOptions = {
//     title: 'Welcome',
//     header: { visible:false }
//   };
//   render() {
//     return <Text>Hello</Text>;
//   }
// }

// class LoginPage extends Component{
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     return <Text>Hello</Text>;
//   }
// }

const TriviaCast = StackNavigator({
  MainPage: {screen: MainPage},
  //LoginPage: {screen: LoginPage},
  //MainMenu: {screen: MainMenu}
});

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';


export default class App extends Component {
  render() {
    return <TriviaCast />;
  }
}

// export default class App extends Component {

//   constructor(props) {
//     super(props)
//     this.page = 0;
//   }
//   render() {
//     return (
//         <MainPage/>
//    );
//     return (
//         <LoginPage/>
//     );
//   }
// }

AppRegistry.registerComponent('TriviaCast', () => TriviaCast);
