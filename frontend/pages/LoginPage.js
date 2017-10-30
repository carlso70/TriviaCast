import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button, FormLabel, FormInput} from 'react-native-elements';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
import ForgotPage from './ForgotPage';


export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    authenticate() {
        // TODO make post request to server, if successful run the nav code below, and pass isLogin param
        this.props.navigation.goBack();
    }
    createAccount() {
        this.props.navigation.goBack();
    }

    render() {
        return (
                <Image
            style={{
                backgroundColor: '#ccc',
                flex: 1,
                resizeMode: 'cover',
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
            }}
            source={{ uri: remotebackg }}
                >
                <TextInput
            placeholder='Username'
            style={styles.inputText}
            onChangeText={ (text) => this.setState({ username: text })}
            value={this.state.username}
                />
                <TextInput
            placeholder='Password'
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={ (text) => this.setState({ password: text })}
            value={this.state.password}
                />
                <View style={styles.buttonArrange}>
                <Button title="Login" onPress={() => this.authenticate() } />
                <Button title="Create Account" onPress={() => this.createAccount() }/>
                <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
            </View>
      </Image>
        );
    }
}

const styles = StyleSheet.create({
    inputText: {
        marginLeft: '20%',
        marginTop: '5%',
        width: '60%'
    },
    buttonArrange: {
        alignItems: 'center',
        paddingBottom: 4
    }
});

