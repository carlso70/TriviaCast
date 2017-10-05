import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View
} from 'react-native';

import ButtonDemo from '../components/ButtonDemo'
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class LoginPage extends Component {

  render() {
    return (
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            resizeMode: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={{ uri: remotebackg }}
        >

        <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 45,
            color: 'white',
            padding: 40,
          }}
        >
          {'signup page test'}
        </Text>
      </Image>
    );
  }
}
