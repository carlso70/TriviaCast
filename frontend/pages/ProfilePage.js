//import react and needed components
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

const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; // import background image

// create and export class 
export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  // render page
  render() {
    return (
      <View>
      <Image //background image
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          resizeMode: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={{ uri: remotebackg }} // background image
      />
      {/*style options for profile page*/}
      <View style={styles.container}>
         <Text style={{fontSize: 30, color: 'white', marginTop: '5%', marginBottom: '5%'}}>My Profile</Text>
         <Image
          source={require('../defaultav.png')}
         />
         <Text style={{fontSize: 20, color: 'white', marginTop: '5%', marginBottom: '5%'}}>Highest scoring game</Text>
         <Text style={{fontSize: 20, color: 'white', marginBottom: '5%'}}>Total games won</Text>
         <Text style={{fontSize: 20, color: 'white', marginBottom: '5%'}}>Total rounds won</Text>
         <Text style={{fontSize: 20, color: 'white', marginBottom: '5%'}}>Global ranking</Text>
         <Text style={{fontSize: 20, color: 'white', marginBottom: '5%'}}>Correct answer rate</Text>
                  <Button
           raised
           buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
           textStyle={{textAlign: 'center', color: 'black'}}
           title={`Update avatar`}
           //onPress={() => navigate('LoginPage')}
         />
      </View>
    </View>
    );
  }
}

// style sheet for page
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  textbox: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center'
  }
});