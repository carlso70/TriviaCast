//import react and needed components
import React, { Component } from 'react';
import {Image,Text, StyleSheet, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; //background image

//create and export class for the main menu 
export default class MainMenu extends Component {

  render() {
    return (
        <Image // background image
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
        {/*the following are all buttons regarding each option from the menu */}
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
           onPress={() => this.props.navigation.navigate('HighScores')} // promps app to navigate to high score 
        />
        <Button
          raised
          buttonStyle={styles.buttons}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Log Out`}
          onPress={() => this.props.navigation.goBack()} // navigate back to the original screen 
        />
      </Image>
    );
  }
}

// style sheet
const styles = StyleSheet.create({
  buttons: {
     alignItems: 'center',
     padding: 20,
      backgroundColor: 'white',
      borderRadius: 10

  }
})
