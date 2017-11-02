import React, { Component } from 'react';
import {Image,Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

import {getAWSUrl} from '../utils/Urls'
import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostUserId: this.props.navigation.state.params.userId,
            gameId: this.props.navigation.state.params.gameId,
            isConnected: false,
            data: 'Test',
        };
    }

    componentDidMount() {
        var endpoint = getAWSUrl() + this.state.gameId;
        this.socket = new WebSocket(endpoint);
        this.socket.onopen = () => {
            this.setState({isConnected: true})
        };
        this.socket.onmessage = (e) => {
            this.setState({data: e.data})
        };
        this.socket.onclose = (e) => {
            this.setState({isConnected: false})
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
                <Text>Game: {this.state.gameId}</Text>
                <Text>isConnected: {this.state.isConnected}</Text>
                <Text>Data: {this.state.data}</Text>

                <View style={styles.buttonArrange}>
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
