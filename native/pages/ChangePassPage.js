//import react and needed components and dependencies 
import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Alert,
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
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

// create and export class to change password 
export default class ChangePassPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initalize state variables 
            username: '',
            oldPassword: '',
            newPassword: '',
        };
    }

    changePassword(username, oldPassword, newPassword) { // method used to change passsword 
        fetch(getAWSUrl() + 'changepassword',{ //create json post request 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // create body for the request 
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        }).then(function(response) { // examine the response 
            console.log(response.status);
            if (response.status === 200) { // 200 means no error occured 
                return response.json();
            } else if (response.status === 500){
                // There was an error with username or password
                Alert.alert(
                    'Invalid Username or Password',
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
            .then((responseJson) => { // when no error occurs alert user 
                if (responseJson) {
                    Alert.alert(
                        'Successful Password Change!',
                        'Yay!',
                        [{text: 'OK', onPress: () => this.props.navigation.navigate('LoginPage')},] // navigate to allow user to login using new password 
                    );
                }
            })

    }

    // render the actual page 
    render() {
        return (
                <ImageBackground // background image
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
                <TextInput // enter username tied to account 
            placeholder='Username'
            style={styles.inputText}
            onChangeText={ (text) => this.setState({ username: text })}
            value={this.state.username}
                />
                <TextInput //enter old password tied to account
            placeholder='Old Password'
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={ (text) => this.setState({ oldPassword: text })}
            value={this.state.oldPassword}
                />

                <TextInput //enter new password the user would like tied to account 
            placeholder='New Password'
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={ (text) => this.setState({ newPassword: text })}
            value={this.state.newPassword}
                />
                <View style={styles.buttonArrange}>
                <Button buttonStyle={styles.buttons} //button to call method to change the password 
            title="Update Password"
            color='black'
            marginTop='30'
            onPress={() => this.changePassword(this.state.username, this.state.oldPassword, this.state.newPassword)}
                />
                <Button
            buttonStyle={styles.buttons} // button to navigate back to main menu 
            title="Go Back"
            color='black'
            onPress={() => this.props.navigation.goBack()}
                />
                </View>
                </ImageBackground>
        );
    }
}

//style sheet for page 
const styles = StyleSheet.create({
    inputText: {
        marginLeft: '20%',
        marginTop: '5%',
        width: '60%'
    },
    buttonArrange: {
        alignItems: 'center',
        paddingBottom: 4
    },
        buttons: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10

    }
});
