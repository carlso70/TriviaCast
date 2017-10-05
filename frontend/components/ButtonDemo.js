import React, {Component} from 'react'
import { Button } from 'react-native-elements';


class ButtonDemo extends Component {
  render = () => {
    return (<Button
      raised
      icon={{name: 'account-circle', color: 'black'}}
      buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
      textStyle={{textAlign: 'center', color: 'black'}}
      title={`Create an account`}
      onPress={() => navigate(LoginPage)}
    />
    )
  }
}

export default ButtonDemo;
