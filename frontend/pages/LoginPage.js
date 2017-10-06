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

const styles = StyleSheet.create({
   inputText: {
      marginLeft: '20%',
      width: '60%'
   },
});

class ForgotPassword extends React.Component {
  static navigationOptions = {
    title: 'Recover Password',
  };
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }
  static navigationOptions = {
    title: 'Login',
  };

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
        <View>
          <Button
          raised
            icon={{name: 'account-circle', color: 'black'}}
            buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`Login`}
          />
          <Button
          raised
            buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
            textStyle={{textAlign: 'center', color: 'black'}}
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
  ForgotPage: {screen: ForgotPassword}
});

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
