import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Alert,
  Text,
  TouchableHighlight,
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  Picker,
} from 'react-native';

import {getAWSUrl} from '../utils/Urls'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button, FormLabel, FormInput} from 'react-native-elements';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class SecuriQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.userId,
      username: this.props.navigation.state.params.username,
      question: 'Your favorite color',
      answer: '',
    };
  }

  setquest(username, question, answer){
    console.log(question)
    console.log(answer)
    //this.setState({ promptVisible: true })       
    fetch(getAWSUrl() + 'setsecurityquestion',{ //create request for user to create account 
        method: 'POST',
        headers: {
            'Accept': 'application/json', // add headers
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ //add body 
            username: username,
            question: question,
            answer: answer
        })
    }).then(function(response) {
        console.log(response.status);
        if (response.status === 200) { //good response no error 
            return response.json();
        } else if (response.status === 500){
            // There was an error with username or password
            Alert.alert(
                'Please type in an answer!'
            );
            return null;
        } else {
            // 404 error or something else
            Alert.alert(
                'Please fix your network', //request didnt send 
                'Try again'
            );
            return null;
        }
    })
        .then((responseJson) => { //response was good so naviagate to the game menu logged in as new user 
            if (responseJson) {
                // this.props.navigation.navigate('GameMenu', { 
                //     userId: responseJson.id, 
                //     username: this.state.username});
                Alert.alert(
                  'Success!!'
              );
                this.props.navigation.goBack();
            }
        })
  }

  render() {
    return (
      <ImageBackground
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
      <Picker
      selectedValue={this.state.question}
      onValueChange={(itemValue, itemIndex) =>
        this.setState({question: itemValue})}>
        <Picker.Item label="What is your favorite color?" value="Your favorite color" />
        <Picker.Item label="What is your favorite vacation spot?" value="Your favorite vacation spot" />
        <Picker.Item label="What is the name of your elementary school?" value="Name of your elementary school" />
      </Picker>
      <TextInput
      placeholder='Answer'
      style={styles.inputText}
      secureTextEntry={true}
      onChangeText={ (text) => this.setState({ answer: text })}
      value={this.state.answer}
      />
      <View style={styles.buttonArrange}>
      <Button buttonStyle={styles.buttons} title="Submit" color='black' marginTop='30' onPress={() => this.setquest(this.state.username, this.state.question, this.state.answer)} />
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputText: {
    marginLeft: '20%',
    marginTop: '5%',
    width: '60%'
  },
  buttonArrange: {
    alignItems: 'center',
    paddingBottom: 4
  },
  buttons: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10

  }
});
