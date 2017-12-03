// import react and neeeded components and dependencies 
import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    Image,
    Text,
    View,
    TextInput,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { StackNavigator } from 'react-navigation';
import {getAWSUrl } from '../utils/Urls'
import { Button, List, ListItem } from 'react-native-elements';
// import { Constants, Audio } from 'expo';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; // background image

export default class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = { // initalize state variables
            connected: false,
            userId: this.props.navigation.state.params.userId,
            gameId: this.props.navigation.state.params.gameId,
            username: this.props.navigation.state.params.username,
            currentQuestion: "",
            quesitonCorrectAnswer: "",
            choice: "",
            users: [this.props.navigation.state.params.username],
            gameLobby: true,
            radio_props: [{label: 'Waiting For Questions....', value: 0 }],
            questionNumber: 1,
            gameOver: false,
        }
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
            console.log("e.data === " + e.data);
            try {
                var data = JSON.parse(e.data);
                console.log("data === ");
                console.log(data.question);
                // If in game and not lobby set data
                if (!data.inLobby) {
                    var choices = new Array();
                    for (var i = 0; i < data.question.choices.length; i++) {
                        choices.push({label: data.question.choices[i], value: i });
                    }
                    this.setState({
                        radio_props: choices,
                        currentQuestion: data.question.question,
                        quesitonCorrectAnswer: data.question.answer,
                        questionNumber: data.questionNumber,
                        gameOver: data.gameOver,
                        gameLobby: data.inLobby,
                    });
                } else if (data.inLobby) {
                    var users = new Array();
                    for (var i = 0; i < data.users.length; i++) {
                        users.push(data.users[i].username);
                    }
                    // Set the new users in the lobby
                    this.setState({
                        users: users,
                        gameLobby: data.inLobby,
                    });
                } else {
                    console.log("Invalid Question Response received, likely null values");
                }
            } catch (e) {
                console.log(e);
            }
        };
        this.socket.onclose = (e) => {
            console.log("CLOSING SOCKET")
            this.setState({connected: false});
        }

        if (this.props.navigation.state.params.joining) {
            this.joinGame(this.props.navigation.state.params.gameId, this.props.navigation.state.params.userId)
        }

        this.emitResponse = this.emitResponse.bind(this)
    }

    emitResponse() {
        if (this.state.connected) {
            console.log("SENDING MESSAGE");
            this.socket.send(JSON.stringify({
                username: this.state.username,
                answer: this.state.choice
            }));
            if(this.state.quesitonCorrectAnswer == this.state.choice)
            {
                    Alert.alert('Correct!', 'The correct answer was: ' + this.state.quesitonCorrectAnswer);
            }
            else {
                Alert.alert('Incorrect!', 'The correct answer was: ' + this.state.quesitonCorrectAnswer);
            }
        }
    }

    joinGame(gameId, userId) {
        fetch(getAWSUrl() + 'joingame',{ // create request to start game
            method: 'POST',
            headers: { // add headers
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // add body headers
                userId: userId,
                gameId: gameId,
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) { // response was good 
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
                if (responseJson) { // parse the response sense it was a success 
                    // SUCCESS
                    console.log("Joined Game");
                    Alert.alert('Game Joined!');
                }
            })
    }

    startGame(gameId, userId) {
        fetch(getAWSUrl() + 'startgame',{ // create request to start game
            method: 'POST',
            headers: { // add headers
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // add body headers
                userId: userId,
                gameId: gameId,
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) { // response was good 
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
                if (responseJson) { // parse the response sense it was a success 
                    // SUCCESS
                    Alert.alert('Game Started!');
                }
            })
    }

    leaveGame(gameId, userId) {
        fetch(getAWSUrl() + 'leavegame',{ // create request to start game
            method: 'POST',
            headers: { // add headers
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // add body headers
                userId: userId,
                gameId: gameId,
            })
        }).then(function(response) {
            console.log(response.status);
            if (response.status === 200) { // response was good 
                return response.json();
            } else if (response.status === 500){
                // There was an error with username or password
                Alert.alert(
                    'Error Leaving Game'
                );
                return null;
            } else {
                // 404 error or something else
                Alert.alert(
                    'Please fix your network',
                    'Error Leaving Game'
                );
                return null;
            }
        })
            .then((responseJson) => {
                if (responseJson) { // parse the response sense it was a success 
                    // SUCCESS
                }
            })
    }

    navigateBack() {
        this.leaveGame(this.state.gameId, this.state.userId)
        this.socket.close()
        this.setState({
            connected: false
        });
        this.props.navigation.goBack();
    }

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.gameLobby) {
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
                    <View style={styles.content}>
                    <View style={styles.messageBox}>
                    <View>
                    <Text style={styles.messageBoxTitleText}>Game Lobby</Text>
                    <Text style={styles.messageBoxBodyText}>{this.state.users[0]}</Text>
                    <Text style={styles.messageBoxBodyText}>{this.state.users[1]}</Text>
                    <Text style={styles.messageBoxBodyText}>{this.state.users[2]}</Text>
                    <Text style={styles.messageBoxBodyText}>{this.state.users[3]}</Text>
                    <Text style={styles.messageBoxBodyText}>{this.state.users[4]}</Text>
                    </View>
                    <View style={styles.buttonArrange}>
                    <Button title="Start Game" onPress={() => this.startGame(this.state.gameId, this.state.userId)} />
                    <Button title="Go Back" onPress={() => this.navigateBack()} />
                    </View>
                    </View>
                    </View>
                    </ImageBackground>
            );
        } else if (this.state.gameOver) {
            return (
                    <View style={styles.content}>
                    <View style={styles.messageBox}>
                    <View>
                    <Text style={styles.messageBoxTitleText}>GAME OVER</Text>
                    </View>
                    <View>
                    <List containerStyle={{marginBottom: 20}}>
                        {
                            this.state.users.map((l, i) => (
    					    <ListItem
 	    					    key={i}
 		    				    title={l +"   " + (Math.round(i + Math.random()*(100)) % 10)*10 } />
 			            	))
                        }
                        </List>
                    </View>
                    <Button title="Go Back" onPress={() => this.navigateBack()} />
                    </View>
                    </View>
            );
        } else {
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
                    <View style={styles.content}>
                    <View style={styles.messageBox}>
                    <View>
                    <Text style={styles.messageBoxTitleText}>Asking Question {this.state.questionNumber}</Text>
                    </View>
                    <View>
                    <Text style={styles.messageBoxBodyText}>{this.state.currentQuestion}</Text>
                    </View>
                    </View>
                    </View>
                    <View style={styles.content}>
                    <View style={styles.buttonArrange}>
                    <RadioForm
                    style={{padding: 50}}
                radio_props={this.state.radio_props}
                initial={0}
                onPress={
                    (value) => {
                        this.setState({choice:this.state.radio_props[value].label});
                    }
                }
                buttonColor={'white'}
                buttonInnerColor={'#e74c3c'}
                labelStyle={{fontSize: 20, color: 'white'}}
                labelWrapStyle={{}}
                labelColor={'#FFFFFF'}
                    />
                    </View>
                    </View>
                    
                    <View style={styles.container}>
                    <Button
                raised
                buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
                textStyle={{textAlign: 'center', color: 'black'}}
                title={`Submit response`}
		        onPress={() => this.emitResponse()}
                    />
                   
                    <Button
                raised
                buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
                textStyle={{textAlign: 'center', color: 'black'}}
                title={`Go Back`}
                onPress={() => {
                    Alert.alert("You left game!");
                    this.props.navigation.goBack()}}/>
                    </View>

                </ImageBackground>
            );
        }
    }
}

// style sheet 
const styles = StyleSheet.create({
    buttonArrange: {
        alignItems:'center',
        alignContent:'center'
    },
    toolbar:{
        backgroundColor:'#fff',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarButton:{
        width:50,
        color:'#000000',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#000000',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    },
    textbox: {
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center'
    },
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    messageBox: {
        backgroundColor:'#0c306b',
        width:300,
        paddingTop:10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:10,
        marginTop: 40,
        marginBottom: 40
    },
    messageBoxTitleText:{
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        fontSize:25,
        marginBottom:10
    },
    messageBoxBodyText:{
        color:'#fff',
        fontSize:18
    },
    gameContextText:{
        color:'#fff',
        fontSize:30,
        textAlign:'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

