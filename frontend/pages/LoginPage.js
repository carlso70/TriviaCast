import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Alert,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    StyleSheet,
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


    authenticate(username, password) {
        fetch('http://ec2-18-221-200-72.us-east-2.compute.amazonaws.com:8080/loginuser',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 500){
                // There was an error with username or password
                Alert.alert(
                    'Invalid Password',
                    'Try another password'
                );
                return null;
            } else {
                // 404 error or something else
                Alert.alert(
                    'Please fix your network',
                    'Try again'
                );
                return null;
            }
        })
            .then((responseJson) => {
                if (responseJson) {
                    this.props.navigation.navigate('GameMenu', { userId: responseJson.id });
                }
            })
    }

    createAccount(username, password) {
        fetch('http://ec2-18-221-200-72.us-east-2.compute.amazonaws.com:8080/createuser',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 500){
                // There was an error with username or password
                Alert.alert(
                    'Invalid Password',
                    'Try another password'
                );
                return null;
            } else {
                // 404 error or something else
                Alert.alert(
                    'Please fix your network',
                    'Try again'
                );
                return null;
            }
        })
            .then((responseJson) => {
                if (responseJson) {
                    this.props.navigation.navigate('GameMenu', { userId: response.id });
                }
            })
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
                <Button title="Login" onPress={() => this.authenticate(this.state.username, this.state.password) } />
                <Button title="Create Account" onPress={() => this.createAccount(this.state.username, this.state.password) }/>
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
