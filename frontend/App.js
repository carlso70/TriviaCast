
import React from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';





import MainPage from './pages/MainPage.js'
import LoginPage from './pages/LoginPage.js'
import SignupPage from './pages/SignupPage.js'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  buttonArrange: {
    alignItems: 'center'
  },
  textbox: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center'
  }
});

class Home extends React.Component{
  static navigationOptions: { header:{ visible:false }};
  render() {
    const { navigate } = this.props.navigation;
    return (

    	 <Image
        source={{uri: 'https://i.imgur.com/vqTkUz8.png'}}
        style={styles.container}
        >
         <View style={styles.textbox}>
            <Text style={{fontSize: 30}}>TriviaCast</Text>
         </View>
         <View style={styles.buttonArrange}>
  			    <Button
              raised
              icon={{name: 'account-circle', color: 'black'}}
              buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
              textStyle={{textAlign: 'center', color: 'black'}}
              title={`Login`}
              onPress={() => navigate('LoginPage')}
            />

    	<Button
      raised
      icon={{name: 'account-circle', color: 'black'}}
      buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
      textStyle={{textAlign: 'center', color: 'black'}}
      title={`Create an account`}
      onPress={() => navigate('SignupPage')}
    />


  </View>
 </Image>

    );
  }
}

class SignUp extends React.Component{
  static navigationOptions: { header:{ visible:false }};
  render() {
    return <SignupPage />;
  }
}

class LogIn extends React.Component{
  static navigationOptions: { header:{ visible:false }};
  render() {
    return <LoginPage />;
  }
}

const TriviaCast = StackNavigator(
  {
    MainPage: {screen: Home},
    SignupPage: {screen: SignUp},
    LoginPage: {screen: LogIn}
  },
  {headerMode: 'screen'}

);



// export default class App extends Component {
//   render() {
//     return <TriviaCast />;
//   }
// }

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0;
  }
  render() {
        return <TriviaCast/>;
    // return (
    //     <LoginPage/>
    // );
  }
}

// AppRegistry.registerComponent('TriviaCast', () => TriviaCast);
