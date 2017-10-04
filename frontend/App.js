import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View
} from 'react-native';

import MainPage from './pages/MainPage'

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.page = 0;
  }
  render() {
    return (
        <MainPage/>
   );
  }
}

AppRegistry.registerComponent('App', () => App);
