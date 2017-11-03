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

import {getAWSUrl} from '../utils/Urls'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Button, FormLabel, FormInput} from 'react-native-elements';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class ChangePassPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            oldPassword: '',
            newPassword: '',
        };
    }

    changePassword(username, oldPassword, newPassword) {
        fetch(getAWSUrl() + 'changepassword',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) {
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
            .then((responseJson) => {
                if (responseJson) {
                    Alert.alert(
                        'Successful Password Change!',
                        'Yay!',
                        [{text: 'OK', onPress: () => this.props.navigation.navigate('LoginPage')},]
                    );
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
            placeholder='Old Password'
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={ (text) => this.setState({ oldPassword: text })}
            value={this.state.oldPassword}
                />

                <TextInput
            placeholder='New Password'
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={ (text) => this.setState({ newPassword: text })}
            value={this.state.newPassword}
                />
                <View style={styles.buttonArrange}>
                <Button buttonStyle={styles.buttons}
            title="Update Password"
            color='black'
            marginTop='30'
            onPress={() => this.changePassword(this.state.username, this.state.oldPassword, this.state.newPassword)}
                />
                <Button
            buttonStyle={styles.buttons}
            title="Go Back"
            color='black'
            onPress={() => this.props.navigation.goBack()}
                />
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
    },
        buttons: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10

    }
});
