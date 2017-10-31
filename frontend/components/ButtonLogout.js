import React, {Component} from 'react'
import { Button } from 'react-native-elements';


class ButtonLogout extends Component {
  render = () => {
    return (<Button
      raised
      //icon={{name: 'account-circle', color: 'black'}}
      buttonStyle={{backgroundColor: 'white', borderRadius: 10, padding: 20}}
      textStyle={{textAlign: 'center', color: 'black'}}
      title={`Log Out`}
      onPress={() => this.props.navigation.goBack()}
    />
    )
  }
}

export default ButtonLogout;