import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
} from 'react-native';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class BackgroundImage extends Component {
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
          {'TriviaCast'}
        </Text>
      </Image>
    );
  }
}

AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);