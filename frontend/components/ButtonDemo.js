import React, {Component} from 'react'

import { Button } from 'react-native-elements';


class NavButton extends Component {
  render = () => {
    return (<Button
      raised
      icon={{name: 'account-circle', color: 'black'}}
      buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
      textStyle={{textAlign: 'center', color: 'black'}}
      title={`Create an account`}
            onPress={this.props.onPress}
    />
    )
  }
}

export default NavButton;
