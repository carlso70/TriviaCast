import React, { Component } from 'react';
import {Image,Text, StyleSheet, , AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';

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
        <Button
          raised
          buttonStyle={styles.buttons}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Create Game`}
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
           onPress={() => this.props.navigation.navigate('HighScores')}
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
