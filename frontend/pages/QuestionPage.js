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

import { StackNavigator } from 'react-navigation';

import ButtonDemo from '../components/ButtonDemo'
import { Button } from 'react-native-elements';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
import AnswerPage from './AnswerPage.js';

const styles = StyleSheet.create({

   buttonArrange: {
     alignItems:'center',
     alignContent:'center'
   },
   toolbar:{
     backgroundColor:'#fff',
     paddingTop:30,
     paddingBottom:10,
     flexDirection:'row'
   },
   toolbarButton:{
     width:50,
     color:'#000000',
     textAlign:'center'
   },
   toolbarTitle:{
     color:'#000000',
     textAlign:'center',
     fontWeight:'bold',
     flex:1
   },
   textbox: {
     backgroundColor: 'rgba(0,0,0,0)',
     alignItems: 'center'
   },
   content:{
     flex:1,
     flexDirection:'row',
     alignItems:'flex-start',
     justifyContent:'center'
   },
   messageBox: {
     backgroundColor:'#0c306b',
     width:300,
     paddingTop:10,
     paddingBottom:20,
     paddingLeft:20,
     paddingRight:20,
     borderRadius:10
   },
   messageBoxTitleText:{
     fontWeight:'bold',
     color:'#fff',
     textAlign:'center',
     fontSize:25,
     marginBottom:10
   },
   messageBoxBodyText:{
     color:'#fff',
     fontSize:18
   },
    gameContextText:{
     color:'#fff',
     fontSize:18,
     textAlign:'center'
   }
});

function getInitialState() {
   return {liked:false};
}


class Question extends Component {

  constructor(props) {
    super(props);
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
	{/*<View style={styles.toolbar}>
	  <Text style={styles.toolbarTitle}>TriviaCast</Text>
	  <Text style={styles.toolbarButton}>Cast</Text>
	</View>*/}

	<View style={styles.content}>
	  <View style={styles.messageBox}>
            <View>
	      <Text style={styles.messageBoxTitleText}>Question 1</Text>
	    </View>
            <View>
	      <Text style={styles.messageBoxBodyText}>How many planets are there?</Text>
	    </View>
	  </View>
	</View>
	<View style={styles.content}>
	  <View style={styles.buttonArrange}>
	  
            <Button
              raised
              buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
              textStyle={{textAlign: 'center', color: 'black'}}
              title={`10 planets`}
            />
	    <Button
              raised
              buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
              textStyle={{textAlign: 'center', color: 'black'}}
              title={`8 planets`}
            />
	    <Button
              raised
              buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
              textStyle={{textAlign: 'center', color: 'black'}}
              title={`9 planets`}
            />
          </View>
	</View>
	<View style={styles.content}>
	  <View style={styles.buttonArrange}>
	    <Button
	      raised
	      buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
	      textStyle={{textAlign: 'center', color: 'black'}}
	      title={`Submit response`}
	      onPress={() => navigate('AnswerPage')}
	    />
	  </View>

	</View>
	<View>
	      <Text style={styles.gameContextText}>Question 1/10 | 1 point</Text>
	    </View>

      </Image>
    );
  }
}

class Answer extends React.Component{
  // static navigationOptions = {
  //   header: {visible: false}
  // };
  render() {
    return <AnswerPage />;
  }
}

const QuestionNav = StackNavigator({
  Question: {screen: Question},
  AnswerPage: {screen: Answer}
},
);

export default class QuestionPage extends React.Component {
  constructor(props) {
    super(props)
    this.page = 2;
  }
  render() {
    return <QuestionNav/>;
  }
}
