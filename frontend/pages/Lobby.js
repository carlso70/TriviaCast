import React, { Component } from 'react';
import {Image,Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      host: '',
    };
  }


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
        {'Lobby'}
      </Text>
      <View style={styles.buttonArrange}>
      <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    </Image>
  );
  }
}

const styles = StyleSheet.create({
  buttons: {
     alignItems: 'center',
     padding: 20,
      backgroundColor: 'white',
      borderRadius: 10

  }
})
