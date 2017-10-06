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

import { StackNavigator } from 'react-navigation';

import ButtonDemo from '../components/ButtonDemo'
import { Button, FormLabel, FormInput} from 'react-native-elements';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
import ForgotPage from './ForgotPage.js';
import ProfilePage from './ProfilePage.js'

const styles = StyleSheet.create({
   inputText: {
      marginLeft: '20%',
      marginTop: '5%',
      width: '60%'
   },
   buttonArrange: {
     alignItems: 'center',
     paddingBottom: 4
   }
});

class ForgotPassword extends React.Component {
  // static navigationOptions = {
  //   header: {visible: false}
  // };
  render() {
    return <ForgotPage />
  }
}

class Profile extends React.Component {
  // static navigationOptions = {
  //   header: {visible: false}
  // };
  render() {
    return <ProfilePage />
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  render() {
    const { navigate } = this.props.navigation;
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


        <TextInput
          placeholder='Username'
          style={styles.inputText}
          onChangeText={ (text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          placeholder='Password'
          style={styles.inputText}
          secureTextEntry={true}
          onChangeText={ (text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <View style={styles.buttonArrange}>
          <Button
          raised
            icon={{name: 'input', color: 'black'}}
            buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200, marginTop: '5%', marginBottom: '25%'}}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`Login`}
            onPress={() => navigate('ProfilePage')}
          />
          <Button
          raised
            buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
            textStyle={{textAlign: 'center', color: 'black'}}
            icon={{name: 'help', color: 'black'}}
            title={`Forgot password`}
            onPress={() => navigate('ForgotPage')}

          />
        </View>
      </Image>
    );
  }
}

const LoginNav = StackNavigator({
  Login: {screen: Login},
  ForgotPage: {screen: ForgotPassword},
  ProfilePage: {screen: ProfilePage}
},
// { headerMode: 'screen'}
);

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.page = 1;
  }
  render() {
    return <LoginNav/>;
  }
}

// class Forgot extends React.Component {
//
// }
