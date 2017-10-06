import React, {Component} from 'react'
import { Button } from 'react-native-elements';


class ButtonHScores extends Component {
  render = () => {
    return (<Button
      raised
      //icon={{name: 'account-circle', color: 'black'}}
      buttonStyle={{backgroundColor: 'white', borderRadius: 10, padding: 20}}
      textStyle={{textAlign: 'center', color: 'black'}}
      title={`High Scores`}
      //onPress={() => navigate(LoginPage.js)}
    />
    )
  }
}

export default ButtonHScores;
