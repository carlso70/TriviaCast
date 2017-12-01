//import react and needed components a
import React, { Component } from 'react';
import {Image,Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {getAWSUrl } from '../utils/Urls'
import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

//create and export class for game lobby
export default class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = { //set state variables using parameters for class
            userId: this.props.navigation.state.params.userId,
            gameId: this.props.navigation.state.params.gameId,
            username: this.props.navigation.state.params.username,
            difficulty: this.props.navigation.state.params.difficulty,
            questionCt: this.props.navigation.state.params.questionCt,
        };

    }
    // start game menthod
    startGame(gameId, userId) {
        // starts naviagation to question page
        this.props.navigation.navigate('QuestionPage', { userId: userId, gameId: gameId });
    }

    render() {
        return (
            <View>
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
                />
                <Text
            style={styles.lobbyText}
                >
                {'Lobby'}
            </Text>
                <View style={styles.buttonArrange}>
                <Button // starts navigation to the first game by calling method 
                    title="Start" onPress={() => this.startGame(this.state.gameId, this.state.userId)} />
                <Button  // navigates back to previous screen
                    title="Go Back" onPress={() => this.props.navigation.goBack()} /> 
                </View>
                </View>
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
