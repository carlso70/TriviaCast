import React, { Component } from 'react';
import {Image,Text, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import {getAWSUrl} from '../utils/Urls'
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class MainMenu extends Component {
    //not sure if this is right
    constructor(props) {
        super(props);
        this.state = {
            //do not know if this is correct usage of this.props.navigation
            userId: this.props.navigation.state.params.userId,
        }
    }

    createGame(userId) {
        fetch(getAWSUrl() + 'creategame', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: userId,
                GameId: 9999,
                Difficulty: AsyncStorage.getItem('Difficulty', (err, result) => {
                  if (result) {
                    return result;
                  }
                  else {
                    return 1;
                  }
                });
                QuestionCt: AsyncStorage.getItem('QuestionCount', (err, result) => {
                  if (result) {
                    return result;
                  }
                  else {
                    return 10;
                  }
                });
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 500) {
                Alert.alert(
                    'Game could not be created'
                );
                return null;
            } else {
                Alert.alert(
                    'Fix network, bad request'
                );
                return null;
            }
        }).then((responseJson) => {
            if (responseJson) {
                console.log(responseJson)
                // The game object json response contains its gameId in a var called id
                console.log("GameId: " + responseJson.id)
                this.props.navigation.navigate('Lobby', {
                    userId: userId,
                    gameId: responseJson.id
                });
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
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`Create Game`}
            onPress={() => this.createGame(this.state.userId)}
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`Join Game`}
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`High Scores`}
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`Game Settings`}
            onPress={() => this.props.navigation.navigate('Settings')}
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`Log Out`}
            onPress={() => this.props.navigation.goBack()}
                />
                </Image>
        );
    }
}

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10

    }
})
