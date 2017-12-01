//import react and needed components / dependencies 
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Alert, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
import { getAWSUrl } from '../utils/Urls'
import { StackNavigator, NavigationActions } from 'react-navigation';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; //background image 

var topscores = new Array();

// create and export class for high scores page 
export default class HighScorePage extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      //get state variables and set userid
      userId: this.props.navigation.state.params.userId,
      score1: 0,
      user1: "",
      score2: 0,
      user2: "",
      score3: 0,
      user3: "",
      myscore: ""
    }

    this.getScores(this.state.userId); // call method to get top scores
  }

  // method to get top scores 
  getScores(userId) {
    fetch(getAWSUrl() + 'highscores', { //create request to get scores 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) { // check response
      console.log(response.status);
      if (response.status == 200) { // there was no error 
        return response.json();
      }
      else if (response.status == 500) {
        Alert.alert('High scores could not be received'); // there was an error 
        return null;
      } else {
        Alert.alert('Fix network, bad request'); //request did not go through 
        return null;
      }
    }).then((responseJson) => {
      console.log(responseJson); // log response 

      if (responseJson) {
        for (var i = 0; i < responseJson.length; i++) { // this will loop through and find the score for the userid 
          var obj = responseJson[i];
          topscores[i] = obj;
          if (obj.id == userId) {
            this.setState({
              myscore: obj.score
            });
            //console.log(myscore);
          }
          //console.log(topscores[i])
          if(i == 0){ // top score
            this.setState({
              score1: obj.score,
              user1: obj.username
            });
          } else if(i == 1) // second score 
          {
            this.setState({
              score2 : obj.score,
              user2 : obj.username
          });
            //console.log(score2);
          } else if(i == 2){ //third score 
            this.setState({
              score3 : obj.score,
              user3 : obj.username
            })
            //console.log(score3);
          }
          
        }
      }
    });
  }

  // render page 
  render() {
    return (

      <ImageBackground // background image 
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          //resizeMode: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={{ uri: remotebackg }}
      >

        <Text // high score text
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
        {/* the follow will use the state variables to display top three scores and users scores  */}
        <Text
          style={{ 
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 30,
            color: 'white',
            padding: 40,
          }}
        >
        {'#1 ' + this.state.score1 + ' User: ' + this.state.user1}
         {/* {'#1 ' + this.topscores[0]["score"] + ' ~ User: ' + this.topscores[0]["username"]}'} */} 
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
          {'#2: ' + this.state.score2 + ' User: ' + this.state.user2}
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
          {'#3: '+ this.state.score3 + ' User: ' + this.state.user3}
          {/* + topscores[2].score + ' ~ User: ' + topscores[2].username} */}
        </Text>

        <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 25,
            color: 'red',
            padding: 40,
          }}
        >
          {'My Score: ' + this.state.myscore}
        </Text>

        <Button //button to go back to the main menu 
          raised
          title={'Go Back'}
          buttonStyle={styles.buttons}
          textStyle={{ textAlign: 'center', color: 'black', backgroundColor: 'transparent' }}
          onPress={() => this.props.navigation.goBack()} />

      </ImageBackground>
    )
  }
}

// style sheet for the page
const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 100
  }
})