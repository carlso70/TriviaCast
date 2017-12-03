// import react and needed components 
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Alert
} from 'react-native';
import ButtonDemo from '../components/ButtonDemo'
import { getAWSUrl } from '../utils/Urls'
import { Button, FormLabel, FormInput} from 'react-native-elements';

// background image 
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

//create and export page for a forgetten password 
export default class ForgotPage extends React.Component {
  constructor(props) { //state variables 
    super(props);
    this.state = { 
      username: this.props.navigation.state.params.username,
      question: '',
      answer: '',
      password: ''
    };    
    this.getquest(this.props.navigation.state.params.username);
  }

  checkquest(username, question, answer, password){
    fetch(getAWSUrl() + 'answersecurityquestion',{ //create request for user to create account 
      method: 'POST',
      headers: {
          'Accept': 'application/json', // add headers
          'Content-Type': 'application.json',
      },
      body: JSON.stringify({ //add body 
          username: username,
          question: question,
          answer: answer,
          password: password
      })
  }).then(function(response) {
      console.log(response.status);
      if (response.status === 200) { //good response no error 
          return response.json();
      } else if (response.status === 500){
          // There was an error with username or password
          Alert.alert(
              'Incorrect answer!'
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
              Alert.alert('Success', 'Your password has been changed!');
              this.props.navigation.goBack();
             
          }
      })
  }


  getquest(username){
    //this.setState({ promptVisible: true })       
    fetch(getAWSUrl() + 'getsecurityquestion',{ //create request for user to create account 
        method: 'POST',
        headers: {
            'Accept': 'application/json', // add headers
            'Content-Type': 'application.json',
        },
        body: JSON.stringify({ //add body 
            username: username
        })
    }).then(function(response) {
        console.log(response.status);
        if (response.status === 200) { //good response no error 
            return response.json();
        } else if (response.status === 500){
            // There was an error with username or password
            Alert.alert(
                'Error, user does not exist!'

            );
            this.props.navigation.goBack();
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
              //   if(responseJson.question == ''){
              //     Alert.alert("User does not have a security question set");
              //     this.props.navigation.goBack();
              //   }
              //  else {
               this.setState({
                  question: responseJson.question
               });
              //}
            }
        })
  }

  //render the page
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
      <View style={styles.textbox}>

        {/* this needs changed to dynamically fill in users security question  */}
      
      </View>
      <TextInput // allow user to enter answer for security question 
        placeholder = {this.state.username}
        text = {this.state.username}
        editable = {false}
        style={styles.inputText}
        //onChangeText={ (text) => this.setState({ answer: text })} // set the state variable to answer 
        //value={this.state.answer}
      />
      <TextInput // allow user to enter answer for security question 
        placeholder = {this.state.question}
        text = {this.state.question}
        placeholderTextColor = 'Your Favorite Color:'
        editable = {false}
        style={styles.inputText}
        //onChangeText={ (text) => this.setState({ answer: text })} // set the state variable to answer 
        //value={this.state.answer}
      />
      <TextInput // allow user to enter answer for security question 
        placeholder='Answer'
        style={styles.inputText}
        onChangeText={ (text) => this.setState({ answer: text })} // set the state variable to answer 
        value={this.state.answer}
      />
      <TextInput // allow user to enter answer for security question 
        placeholder='New Password'
        style={styles.inputText}
        onChangeText={ (text) => this.setState({ password: text })} // set the state variable to answer 
        value={this.state.password}
      />

      <View style={styles.buttonArrange}>
        <Button
        raised
          //icon={{name: 'account-circle', color: 'black'}}
          buttonStyle={btnstyles.buttons}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Submit`}
          onPress={() => this.checkquest(this.state.username, this.state.question, this.state.answer, this.state.password)}
        />
        <Button 
          buttonStyle={btnstyles.buttons} 
          title="Go Back" 
          color='black' onPress={() => this.props.navigation.goBack()} />
      </View>
    </ImageBackground>
    );
  }
}

// style sheets for the page 
const btnstyles = StyleSheet.create({
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

//style sheet two for the page
const styles = StyleSheet.create({
  inputText: {
     marginLeft: '10%',
     paddingBottom: 20,
     marginTop: 20,
     //borderRadius: 10,
     width: '60%'
  },
  textbox: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  buttonArrange: {
    alignItems: 'center'
  }
});
