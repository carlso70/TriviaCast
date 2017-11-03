import React, { Component } from 'react';
import {Image,Text, StyleSheet, Alert, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';

import { StackNavigator } from 'react-navigation';
import {getAWSUrl} from '../utils/Urls'
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class MainMenu extends Component {
    //not sure if this is right
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.state.params.userId,
            difficulty: 1,
            questionCt: 10,
        }
    }

    createGame(userId) {
<<<<<<< HEAD
        var dif = AsyncStorage.getItem('Difficulty');
        if (dif == null)
            dif = 1;
        var ct = AsyncStorage.getItem('QuestionCount');
        if (ct == null)
            ct = 10;

        fetch(getAWSUrl() + 'creategame', {
=======
      AsyncStorage.getItem('Difficulty', (err, result) => {
        this.state.difficulty = result;
      });
      AsyncStorage.getItem('QuestionCount', (err, result) => {
        console.log('Q count before ' + this.state.questionCt);
        this.setState(previous => {
          return {questionCt: result};
        });
        console.log('Q count updated to ' + this.state.questionCt);
      });
      fetch(getAWSUrl() + 'creategame', {
>>>>>>> settings_connect
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                gameId: 9999,
<<<<<<< HEAD
                difficulty: 1,
                questionCt: 10
=======
                difficulty: this.state.difficulty,
                questionCt: this.state.questionCt
>>>>>>> settings_connect
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
                    gameId: responseJson.id,
                    difficulty: this.state.difficulty,
                    questionCt: this.state.questionCt
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
            onPress={() => this.props.navigation.navigate('Game')}
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={`High Scores`}
            onPress={() => this.props.navigation.navigate('HighScores', {
                userId: this.state.userId
            })}
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
