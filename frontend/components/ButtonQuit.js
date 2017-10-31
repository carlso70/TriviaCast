import React, {Component} from 'react'
import { Button } from 'react-native-elements';


class ButtonPlay extends Component {
  render = () => {
    return (<Button
      raised
      //icon={{name: 'account-circle', color: 'black'}}
      buttonStyle={{backgroundColor: 'white', borderRadius: 10, padding: 50}}
      textStyle={{textAlign: 'center', color: 'black'}}
      title={`Quit`}
      //onPress={() => navigate(MainMenu.js)}
    />
    )
  }
}

export default ButtonPlay;
