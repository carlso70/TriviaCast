// import react and needed components 
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import ButtonDemo from '../components/ButtonDemo'
import { Button } from 'react-native-elements';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; // background image 

// create and export page for signup page 
export default class SignupPage extends Component {

  // rend page 
  render() {
    return (
        <Image
          style={{// background style 
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

        <TextInput placeholder='Username' style={styles.inputText} />
        <TextInput placeholder='Password' style={styles.inputText} secureTextEntry={true}/>
        <TextInput
          placeholder='Email'
          style={styles.inputText}
          keyboardType='email-address'
        />
        <View style={styles.buttonArrange}>
        <Button
          raised
          icon={{name: 'account-circle', color: 'black'}}
          buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200, marginTop: '5%'}}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Create`}
        />
        </View>
      </Image>
    );
  }
}

// style sheet for page
const styles = StyleSheet.create({
  
     inputText: {
        marginLeft: '20%',
        marginTop: '5%',
        width: '60%'
     },
     buttonArrange: {
       alignItems: 'center'
     }
  });
