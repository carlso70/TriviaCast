import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Alert,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import {getAWSUrl} from '../utils/Urls'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button, FormLabel, FormInput} from 'react-native-elements';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class SecuriQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
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
      placeholder='Answer'
      style={styles.inputText}
      secureTextEntry={true}
      //onChangeText={ (text) => this.setState({ password: text })}
      value={this.state.answer}
      />
      <View style={styles.buttonArrange}>
      <Button buttonStyle={styles.buttons} title="Login" color='black' marginTop='30' onPress={() => this.authenticate(this.state.username, this.state.password) } />
      <Button buttonStyle={styles.buttons} title="Go Back" color='black' onPress={() => this.props.navigation.goBack()} />
      </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  inputText: {
    marginLeft: '20%',
    marginTop: '5%',
    width: '60%'
  },
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
