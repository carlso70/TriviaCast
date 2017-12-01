//import react and needed components 
import React, { Component } from 'react';
import {
    AppRegistry,
    Alert,
    Image,
    Text,
    ImageBackground,
    View
} from 'react-native';
import LoginComponent from '../components/LoginComponent'
import { Button } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; //background image

// create and export main page
export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    // render the page
    render() {
        var page;
        if (!this.state.isLoggedIn) { // if the user is logged in 
            page = <LoginComponent navigation={this.props.navigation} />
        }else{
            // Whatever our game page will be, which will allow users to create/join/start game
            page = <Text>Testing</Text>;
        }
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

                { page }
            </ImageBackground>
        );
    }
}
