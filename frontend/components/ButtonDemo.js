import React, {Component} from 'react'
import { Button } from 'react-native-elements';

class ButtonDemo extends Component {
  render = () => {
    return (<Button
      raised
      icon={{name: 'home', size: 32}}
      buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
      textStyle={{textAlign: 'center'}}
      title={`Welcome to\nReact Native Elements`}
    />
    )
  }
}

export default ButtonDemo;
