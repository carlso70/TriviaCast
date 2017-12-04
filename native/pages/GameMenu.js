//import react and needed components and dependencies
import React, { Component } from 'react';
import {
	View
} from 'react-native';
import {Image,Text, StyleSheet, Alert, AsyncStorage, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import {getAWSUrl} from '../utils/Urls'

// background image
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { // set state variables
            userId: this.props.navigation.state.params.userId, // use class parameters
            username: this.props.navigation.state.params.username,

            // Default Values
            difficulty: 1, 
            questionCt: 10,
        }
    }

    // method to create game and connec with backend
    async createGame(userId) {
        var diff;
        var ct;
        try{
            await AsyncStorage.getItem('difficulty').then((value) => {
                diff = JSON.parse(value)
                this.setState({
                    difficulty: diff
                })
            })
            await AsyncStorage.getItem('questionCount').then((value) => {
                ct = JSON.parse(value) 
                this.setState({
                    questionCt: ct
                })               
            }) // get question count from async storage
        } catch (error) {
            Alert.alert(error)
        } 
        Alert.alert('Creating Game With Difficulty = ' + this.state.difficulty + ' and Question Count = ' + this.state.questionCt)
        fetch(getAWSUrl() + 'creategame', { // create json request
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ //add body elements to the json request
                userId: userId,
                gameId: 9999,
                difficulty: this.state.difficulty,
                questionCt: this.state.questionCt
            })
        }).then(function(response) {  // get response from request
            console.log(response.status); // log the status for debuging
            if (response.status === 200) { // response was successful
                return response.json();
            } else if (response.status === 500) { // there was an error
                Alert.alert(
                    'Game could not be created' // error with the game
                );
                return null;
            } else {
                Alert.alert(
                    'Fix network, bad request' // request wasnt sent
                );
                return null;
            }
        }).then((responseJson) => { // request was successful
            if (responseJson) {
                console.log(responseJson) // log for debugging
                // The game object json response contains its gameId in a var called id
                console.log("GameId: " + responseJson.id)
                console.log("username: " + responseJson.users[0].username)
                this.props.navigation.navigate('QuestionPage', {
                    userId: userId,
                    gameId: responseJson.id,
                    username: responseJson.users[0].username,
                    difficulty: this.state.difficulty,
                    questionCt: this.state.questionCt
                });
            }
        })
    }

    // render actual page
    render() {
        return (

                <ImageBackground
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
                <View style={styles.buttonArrange}>
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={'Create Game'}
            onPress={() => this.createGame(this.state.userId)}
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={'Join Game'}
            onPress={() => this.props.navigation.navigate('JoinGamePage', {
                username: this.props.navigation.state.params.username,
                userId: this.state.userId
            })}
                />
								<Button
						raised
						buttonStyle={styles.buttons}
						textStyle={{textAlign: 'center', color: 'black'}}
						title={'Chat Room'}
						onPress={() => this.props.navigation.navigate('ChatRoom', {
								username: this.props.navigation.state.params.username,
								userId: this.state.userId
						})}
								/>
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={'Game Settings'}
            onPress={() => this.props.navigation.navigate('Settings')} // navigate to settings page
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={'Change Avatar'}
            onPress={() => this.props.navigation.navigate('ChangeAvatar', {
                username: this.state.username
                })} // navigate to avatar page
                />
                <Button
            raised
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black'}}
            title={'Log Out'}
            onPress={() => this.props.navigation.goBack()} // go back to the previous page and log out
                />
                </View>
                </ImageBackground>
        );
    }
}


    // style sheet for page
    const styles = StyleSheet.create({
        buttonArrange: {
            alignItems: 'center',
            paddingBottom: 4,
            backgroundColor: "transparent"
        },
        buttons: {
            alignItems: 'center',
            padding: 20,
            backgroundColor: 'white',
            marginTop: 20,
            borderRadius: 10

        }
    })
