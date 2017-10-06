
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
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

const styles = StyleSheet.create({
   inputText: {
      marginLeft: '20%',
      width: '60%'
   },
});

export default class ForgotPage extends React.Component {
  render() {
    return (
      <Text>Hello</Text>
    );
  }
}
