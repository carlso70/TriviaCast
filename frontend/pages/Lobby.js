import React, { Component } from 'react';
import {Image,Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {getAWSUrl } from '../utils/Urls'
import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.state.params.userId,
            gameId: this.props.navigation.state.params.gameId,
            username: this.props.navigation.state.params.username,
            difficulty: this.props.navigation.state.params.difficulty,
            questionCt: this.props.navigation.state.params.questionCt,
        };

    }

    startGame(gameId, userId) {
        this.props.navigation.navigate('QuestionPage', { userId: userId, gameId: gameId });
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
                <Text
            style={styles.lobbyText}
                >
                {'Lobby'}
            </Text>
                <View style={styles.buttonArrange}>
                <Button title="Start" onPress={() => this.startGame(this.state.gameId, this.state.userId)} />
                <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
                </View>
                </Image>
        );
    }
}

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
