
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

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
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
        <Button
        raised
          icon={{name: 'account-circle', color: 'black'}}
          buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Login`}
        />
        <Button
          title="Forgot password"
        />
      </Image>
    );
  }
}
