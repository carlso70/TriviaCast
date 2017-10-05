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

class Home extends React.Component{
  static navigationOptions = {
    title: 'Welcome',
    // header: { visible:false }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Text>TriviaCast</Text>
      <Button
        onPress={() => navigate('SignupPage')}
        title="Create an Account"
      />
      <Button
        onPress={() => navigate('LoginPage')}
        title="Login"
      />
      </View>
    );
  }
}

class SignUp extends React.Component{
  static navigationOptions = {
    title: 'Sign Up',
  };
  render() {
    return <SignupPage />;
  }
}

class LogIn extends React.Component{
  static navigationOptions = {
    title: 'Log In',
  };
  render() {
    return <LoginPage />;
  }
}

const TriviaCast = StackNavigator({
  MainPage: {screen: Home},
  SignupPage: {screen: SignUp},
  LoginPage: {screen: LogIn}
});

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';


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
