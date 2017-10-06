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
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

const styles = StyleSheet.create({

   inputText: {
      marginLeft: '20%',
      width: '60%'
   },
   buttonArrange: {
     alignItems: 'center'
   },
   textbox: {
     backgroundColor: 'rgba(0,0,0,0)',
     alignItems: 'center'
   }
});

export default class QuestionPage extends Component {

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

	<View style={styles.textbox}>
	<Text style={{fontSize: 50}}>Question #1</Text>
        </View>
	<View style={styles.buttonArrange}>
        <Button
          raised
          buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
          textStyle={{textAlign: 'center', color: 'black'}}
          title={`Answer`}
        />
        </View>
      </Image>
    );
  }
}
