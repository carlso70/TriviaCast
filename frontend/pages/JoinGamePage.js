//import react and needed components a
import React, { Component } from 'react';
import {Image,Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {getAWSUrl } from '../utils/Urls'
import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

//create and export class for game lobby
export default class JoinGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //set state variables using parameters for class
            userId: this.props.navigation.state.params.userId,
            gameId: 0,
            username: this.props.navigation.state.params.username,
        };

        // Fetch all the games
        this.listGames();
    }

    // list game method
    listGames() {
        fetch(getAWSUrl() + 'listgames').then(function(response) {
            console.log(response.status);
            if (response.json()) { // response was good
                return response.json();
            } else if (response.status === 500){
                // There was an error with username or password
                Alert.alert(
                    'Error Finding Games'
                );
                return null;
            } else {
                // 404 error or something else
                Alert.alert(
                    'Please fix your network',
                    'Error Starting'
                );
                return null;
            }
        })
            .then((responseJson) => {
                if (responseJson) { // parse the response sense it was a success 
                    // SUCCESS
                    console.log(responseJson)
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
            source={{ uri: remotebackg }} // source for background image 
                >
                <Text
            style={styles.lobbyText}
                >
                {'Lobby'}
            </Text>
                <View style={styles.buttonArrange}>
                <Button title="Find Games" onPress={() => this.listGames()} />
                <Button  // navigates back to previous screen
                    title="Go Back" onPress={() => this.props.navigation.goBack()} /> 
                </View>
                </Image>
        );
    }
}

//style sheet for the page 
const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10
    },
    lobbyText: {
        backgroundColor: 'transparent', textAlign: 'center',
        fontSize: 45,
        color: 'white',
        padding: 40,
    }
})
