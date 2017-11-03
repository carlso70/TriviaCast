import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {Button} from 'react-native-elements';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
import {getAWSUrl} from '../utils/Urls'
import { StackNavigator, NavigationActions } from 'react-navigation';

var myscore;
var topscores;

export default class HighScorePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          //do not know if this is correct usage of this.props.navigation
          userId: this.props.navigation.state.params.userId,
      }
    }

      getScores(userId) {
        fetch(getAWSUrl() + 'highscores', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(function(respons) {
          console.log(response.status);
          if(response.status == 200) {
            return response.json();
          }
          else if(response.status == 500) {
            Alert.alert('High scores could not be received');
            return null;
          } else{
            Alert.alert('Fix network, bad request');
            return null;
          }
        }). then((responseJson) => {
              var arrScores = JSON.parse(responseJson);
              for(var i = 0; i < arrScores.length; i++){
                var obj = arrScores[i];
                topscores[i] = obj;
                if(obj.id == userId)
                {
                    myscore = obj.score;
                }
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
            {'High Scores'}
          </Text>

          <Text
            style={{
              backgroundColor: 'transparent',
              textAlign: 'center',
              fontSize: 30,
              color: 'white',
              padding: 40,
            }}
          >
            {'#1: ' + topscores[0].score + ' ~ User: ' + topscores[0].username}
          </Text>
           
          <Text
            style={{
              backgroundColor: 'transparent',
              textAlign: 'center',
              fontSize: 30,
              color: 'white',
              padding: 40,
            }}
          >
            {'#1: ' + topscores[1].score + ' ~ User: ' + topscores[1].username}
          </Text>

          <Text
            style={{
              backgroundColor: 'transparent',
              textAlign: 'center',
              fontSize: 30,
              color: 'white',
              padding: 40,
            }}
          >
            {'#1: ' + topscores[2].score + ' ~ User: ' + topscores[2].username}
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