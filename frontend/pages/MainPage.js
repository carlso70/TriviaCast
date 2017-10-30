import React, { Component } from 'react';
import {
    AppRegistry,
    Alert,
    Image,
    Text,
    View
} from 'react-native';

import LoginComponent from '../components/LoginComponent'
import { Button } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    render() {
        var page;
        if (!this.state.isLoggedIn) {
            page = <LoginComponent navigation={this.props.navigation} />
        }else{
            // Whatever our game page will be, which will allow users to create/join/start game
            page = <Text>Testing</Text>;
        }
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
                { page }
            </Image>
        );
    }
}
