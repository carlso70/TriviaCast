import React, { Component } from 'react';
import {Image,Text,Button} from 'react-native';

import ButtonPlay from '../components/ButtonPlay'
import ButtonGameSettings from '../components/ButtonGameSettings'
import ButtonHScores from '../components/ButtonHScores'
import ButtonLogout from '../components/ButtonLogout'
import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class MainMenu extends Component {

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
          {'Main Menu'}
        </Text>
        <ButtonPlay/>
        <ButtonHScores/>
        <ButtonGameSettings/>
        <ButtonLogout/>
      </Image>
    );
  }
}
