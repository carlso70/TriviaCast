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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },

});

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
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
      <View style={styles.container}>
         <Text style={{fontSize: 30}}>My Profile</Text>
         <Image
          source={require('../dog.png')}
         />
         <Text style={{fontSize: 20}}>Highest scoring game</Text>
         <Text style={{fontSize: 20}}>Total games won</Text>
         <Text style={{fontSize: 20}}>Total rounds won</Text>
         <Text style={{fontSize: 20}}>Global ranking</Text>
         <Text style={{fontSize: 20}}>Correct answer rate</Text>
      </View>
    </Image>
    );
  }
}
