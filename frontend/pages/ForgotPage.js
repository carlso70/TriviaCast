
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
  constructor(props) {
    super(props);
    this.state = { answer: ''};
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

      <Text>Security Question?</Text>
      <TextInput
        placeholder='Answer'
        style={styles.inputText}
        onChangeText={ (text) => this.setState({ answer: text })}
        value={this.state.answer}
      />
      <View>
        <Button
        raised
          icon={{name: 'account-circle', color: 'black'}}
          buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Submit`}
        />
      </View>
    </Image>
    );
  }
}
