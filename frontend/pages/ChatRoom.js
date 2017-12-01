import React, { Component } from 'react';
import { WebView } from 'react-native';
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
//import { Image } from 'react-native'
//import PhotoUpload from 'react-native-photo-upload'

// background image
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

//create and export page for a forgetten password
export default class ChatRoom extends React.Component {
  constructor(props) { //state variables
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      answer: ''};

  }

  //render the page
  render() {
   return (
     <WebView
       source={{uri: 'http://localhost:3500/'}}
       style={{marginTop: 20}}
     />
   );
 }
}
