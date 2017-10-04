import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';


class ButtonDemo extends Component {
  render = () => {
    //const { navigate } = this.props.navigation;
    return (<Button
      raised
      icon={{name: 'account-circle', color: 'black'}}
      buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
      textStyle={{textAlign: 'center', color: 'black'}}
      title={`Create an account`}
      //onPress={() => navigate(LoginPage.js)}
    />
    )
  }
}

export default ButtonDemo;
