import React, { Component } from 'react';
import {Image,Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

import {getAWSUrl } from '../utils/Urls'
import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class GameSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
      style={styles.lobbyText}
      >
      {'Available Games'}
      </Text>
      <Text style={styles.gameCard}>
      {'Game 1'}
      </Text>
      <View style={styles.buttonArrange}>
      <Button title="Select"/>
      </View>
      <Text style={styles.gameCard}>
      {'Game 2'}
      </Text>
      <View style={styles.buttonArrange}>
      <Button title="Select"/>
      </View>
      <Text style={styles.gameCard}>
      {'Game 3'}
      </Text>
      <View style={styles.buttonArrange}>
      <Button title="Select"/>
      </View>
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
    },
    lobbyText: {
        backgroundColor: 'transparent', textAlign: 'center',
        fontSize: 45,
        color: 'white',
        padding: 40,
        justifyContent: 'top',
    },
    gameCard: {
      backgroundColor: 'transparent', textAlign: 'left',
      fontSize: 25,
      color: 'white',
      padding: 20,
    }
})
