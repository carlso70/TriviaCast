//import react and needed components
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'
import { StackNavigator, NavigationActions } from 'react-navigation';

// export default login component class
export default class LoginComponent extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            
            <View>
            <Text 
                style={{ // text style 
                    backgroundColor: 'transparent',
                    textAlign: 'center',
                    fontSize: 45,
                    color: 'white',
                    padding: 40,
                }}
                >
                {'TriviaCast'}
            </Text>
            <Button // this button will initiate navigation to the login page
                buttonStyle={styles.buttons} 
                color="black" title="Login" 
                onPress={() => this.props.navigation.navigate('Login')}/>
        </View>
        )
    }
}

// style sheet for all buttons
const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10

    }
})