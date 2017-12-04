//import react and needed components/dependencies
import React, { Component } from 'react';
import {
    AppRegistry,
    Image, Alert,
    Text,
    TouchableHighlight,
    ImageBackground,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import {getAWSUrl} from '../utils/Urls'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button, FormLabel, FormInput} from 'react-native-elements';
//import {Prompt} from 'react-native-prompt';


const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; //background image

// create and export page for users to login at
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            promptVisible: false,
            answer: '',
            question: ''
        };

        console.disableYellowBox = true;
    }
    
    authenticate(username, password) { //create request for user to login 
        try{
        fetch(getAWSUrl() + 'loginuser',{
            method: 'POST',
            headers: { //add headers 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // add body tags 
                username: username,
                password: password,
            })
        }).then(function(response) { // format response
            console.log(response.status);
            if (response.status === 200) { // good response
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
                    'Please fix your network', // there was an issue and the request wasnt sent
                    'Try again'
                );
                return null;
            }
        })
            .then((responseJson) => { // response was good
                if (responseJson) {
                    this.props.navigation.navigate('GameMenu', {
                        userId: responseJson.id,
                        username: username
                    }); //navigate to main menu as logged in user
                }
            })
        }
        catch(e){
            Alert.alert(
                'Please fix your network', // there was an issue and the request wasnt sent
                'Try again'
            );
        }
    }

    createAccount(username, password, question) {
        //this.setState({ promptVisible: true })       
        fetch(getAWSUrl() + 'createuser',{ //create request for user to create account 
            method: 'POST',
            headers: {
                'Accept': 'application/json', // add headers
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ //add body 
                username: username,
                password: password
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) { //good response no error 
                return response.json();
            } else if (response.status === 500){
                // There was an error with username or password
                Alert.alert(
                    'Error',
                    'Try another password or username'
                );
                return null;
            } else {
                // 404 error or something else
                Alert.alert(
                    'Please fix your network', //request didnt send 
                    'Try again'
                );
                return null;
            }
        })
            .then((responseJson) => { //response was good so naviagate to the game menu logged in as new user 
                if (responseJson) {
                    // this.props.navigation.navigate('GameMenu', { 
                    //     userId: responseJson.id, 
                    //     username: this.state.username});
                    this.props.navigation.navigate('SecurityQues', { 
                        userId: responseJson.id, 
                        username: this.state.username});
                }
            })
    }

    checkusername(username){
        if(username == '')
        {
            Alert.alert("Please enter a username");
        }
        else{
            this.props.navigation.navigate('ForgotPassword', {
                username: this.state.username
            });
        }
    }

    render() { // create actual page 
        return (
//<View>
                <ImageBackground //background image 
            style={{
                backgroundColor: '#ccc',
                flex: 1,
                //resizeMode: 'cover',
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
            placeholder='Password' // all user to enter password
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={ (text) => this.setState({ password: text })} // change state variable
            value={this.state.password}
                />
                <View style={styles.buttonArrange}>
                <Button buttonStyle={styles.buttons} title="Login" color='black' marginTop='30' onPress={() => this.authenticate(this.state.username, this.state.password) } />
                <Button buttonStyle={styles.buttons} title="Change Password" color='black' onPress={() => this.props.navigation.navigate('ChangePassword') } />
                <Button 
                        buttonStyle={styles.buttons} 
                        title="Forgot Password" color='black' 
                        onPress={() => this.checkusername(this.state.username)} />
                <Button buttonStyle={styles.buttons} title="Create Account" color='black' onPress={() => this.createAccount(this.state.username, this.state.password) } />
                <Button buttonStyle={styles.buttons} title="Go Back" color='black' onPress={() => this.props.navigation.goBack()} />
                </View>
            
                
                </ImageBackground>
                
                
        );
    }
}

// style sheet for page
const styles = StyleSheet.create({
    inputText: {
        marginLeft: '20%',
        marginTop: '5%',
        width: '60%'
    },
    buttonArrange: {
        alignItems: 'center',
        paddingBottom: 4,
        backgroundColor: "transparent"
    },
    buttons: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10

    }
});
