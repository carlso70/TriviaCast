// import react and needed components 
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import ButtonDemo from '../components/ButtonDemo'
import { Button, FormLabel, FormInput} from 'react-native-elements';

// background image 
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

//create and export page for a forgetten password 
export default class ForgotPage extends React.Component {
  constructor(props) { //state variables 
    super(props);
    this.state = { 
      username: this.props.navigation.state.params.username,
      answer: ''};
    
  }

  //render the page
  render() {
    return (
      <View>
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
      />
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
        placeholder = 'This will Hold The Users Question'
        text = 'This will Hold The Users Question'
        placeholderTextColor = 'black'
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
      <View style={styles.buttonArrange}>
        <Button
        raised
          //icon={{name: 'account-circle', color: 'black'}}
          buttonStyle={btnstyles.buttons}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Submit`}
          //onPress={} //this will call method that checks the answer 
        />
        <Button 
          buttonStyle={btnstyles.buttons} 
          title="Go Back" 
          color='black' onPress={() => this.props.navigation.goBack()} />
      </View>
    </View>
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
