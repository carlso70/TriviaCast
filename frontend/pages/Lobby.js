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
            gameStart: false,
            difficulty: this.props.navigation.state.params.difficulty,
            questionCt: this.props.navigation.state.params.questionCt,
            isConnected: false,
            data: 'Test',
        };
        // Setup websocket
        socketurl = 'ws://ec2-18-221-200-72.us-east-2.compute.amazonaws.com:3000/';
        var endpoint = socketurl + 'game_socket/'+ this.state.gameId + '';
        console.log("Connecting to websocket at " + endpoint);
        this.socket = new WebSocket(endpoint);
        this.socket.onopen = () => {
            console.log("OPEN");
            this.setState({connected: true});
        };
        this.socket.onmessage = (e) => {
            this.setState({data: e.data});
        };
        this.socket.onclose = (e) => {
            console.log("CLOSING SOCKET")
            this.setState({connected: false});
        }

        this.emitTest = this.emitTest.bind(this)
    }


    startGame(gameId, userId) {
        fetch(getAWSUrl() + 'startgame',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                gameId: gameId,
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 500){
                // There was an error with username or password
                Alert.alert(
                    'Error Starting Game'
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
                if (responseJson) {
                    //this.props.navigation.navigate('GameMenu', { userId: responseJson.id });
                    // TODO START GAME
                }
            })
    }

    emitTest() {
        if (this.state.connected) {
            console.log("SENDING MESSAGE");
            this.socket.send(JSON.stringify({ userId: this.state.userId , gameId: this.state.gameId, answer: 'test'}));
        }
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
                // <Text>Game: {this.state.gameId}</Text>
                // <Text>isConnected: {this.state.isConnected}</Text>
                // <Text>Data: {this.state.data}</Text>

                <View style={styles.buttonArrange}>
                <Button title="Start" onPress={() => this.emitTest()} />
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
