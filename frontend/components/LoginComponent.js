import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'

import { StackNavigator, NavigationActions } from 'react-navigation';
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
                <Button buttonStyle={styles.buttons} color="black" title="Login" onPress={() => this.props.navigation.navigate('Login')}/>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10

    }
})