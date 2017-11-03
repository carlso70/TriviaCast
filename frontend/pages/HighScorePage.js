import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { Button } from 'react-native-elements';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
import { getAWSUrl } from '../utils/Urls'
import { StackNavigator, NavigationActions } from 'react-navigation';

//var myscore = 0;
var topscores = new Array();

export default class HighScorePage extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      //do not know if this is correct usage of this.props.navigation
      userId: this.props.navigation.state.params.userId,
      score1: 0,
      user1: "",
      score2: 0,
      user2: "",
      score3: 0,
      user3: "",
      myscore: ""
    }

    this.getScores(this.state.userId);
  }

  getScores(userId) {
    fetch(getAWSUrl() + 'highscores', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      console.log(response.status);
      if (response.status == 200) {
        return response.json();
      }
      else if (response.status == 500) {
        Alert.alert('High scores could not be received');
        return null;
      } else {
        Alert.alert('Fix network, bad request');
        return null;
      }
    }).then((responseJson) => {
      //var arrScores = JSON.parse(responseJson);
      console.log(responseJson);

      if (responseJson) {
        for (var i = 0; i < responseJson.length; i++) {
          var obj = responseJson[i];
          topscores[i] = obj;
          if (obj.id == userId) {
            this.setState({
              myscore: obj.score
            });
            //console.log(myscore);
          }
          //console.log(topscores[i])
          if(i == 0){
            this.setState({
              score1: obj.score,
              user1: obj.username
            });
          } else if(i == 1)
          {
            this.setState({
              score2 : obj.score,
              user2 : obj.username
          });
            //console.log(score2);
          } else if(i == 2){
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

        <Button
          raised
          title={'Go Back'}
          buttonStyle={styles.buttons}
          textStyle={{ textAlign: 'center', color: 'black', backgroundColor: 'transparent' }}
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