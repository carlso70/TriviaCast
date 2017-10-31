import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {Button} from 'react-native-elements';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
import { StackNavigator, NavigationActions } from 'react-navigation';

export default class HighScorePage extends React.Component {
    constructor(props){
        super(props)
        
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
            {'High Scores'}
            
          </Text>


          <Button 
              raised
              title={'Go Back'} 
              buttonStyle={styles.buttons} 
              textStyle={{textAlign: 'center', color: 'black', backgroundColor: 'transparent'}}
              onPress={() => this.props.navigation.goBack()} /> 
            
          </Image>
        )
    }
}

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 100
  }
})