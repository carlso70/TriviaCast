import React, { Component } from 'react';
import {Image,Text, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class MainMenu extends Component {

  //not sure if this is right
  constructor(props) {
    super(props);
    this.state = {
      //do not know if this is correct usage of this.props.navigation
      userId: this.props.navigation.state.params.userId,
    }
  }


//TODO get create game working and passing user id and game id to the lobby screen properties
  createGame(userId) {
    fetch('http://ec2-18-221-200-72.us-east-2.compute.amazonaws.com:8080/createGame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //TODO fix request format to prevent 500 error
      body: JSON.stringify({
        userId: userId,
        gameId: 1234,
      })
    }).then(function(response) {
      console.log(response.status);
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 500) {
        Alert.alert(
          'Game could not be created'
        );
        return null;
      } else {
        Alert.alert(
          'Fix network, bad request'
        );
        return null;
      }
    }).then((responseJson) => {
      if (responseJson) {
        this.props.navigation.navigate('Lobby', { userId: responseJson.userId,
          gameId: responseJson.gameId })
      }
    })
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
          {'Main Menu'}
        </Text>
        <Button
          raised
          buttonStyle={styles.buttons}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Create Game`}
          onPress={() => this.createGame(this.state.userId)}
          />
        <Button
          raised
          buttonStyle={styles.buttons}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Join Game`}
         />
         <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
           title={`High Scores`}
        />
        <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`Game Settings`}
            onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          raised
          buttonStyle={styles.buttons}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Log Out`}
          onPress={() => this.props.navigation.goBack()}
        />
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
