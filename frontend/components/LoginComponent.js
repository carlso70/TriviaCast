import React from 'react'
import {View, Text} from 'react-native'
import { Button } from 'react-native-elements'

export default class LoginComponent extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
                <View>
                <Text
            style={{
                backgroundColor: 'transparent',
                textAlign: 'center',
                fontSize: 45,
                color: 'white',
                padding: 40,
            }}
                >
                {'TriviaCast'}
            </Text>
                <Button title="Login"  onPress={() => this.props.navigation.navigate('Login')}/>
                </View>
        )
    }
}
