import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    Image,
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { StackNavigator } from 'react-navigation';
import {getAWSUrl } from '../utils/Urls'
import { Button } from 'react-native-elements';
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';

import { Constants, Audio } from 'expo';

var radio_props = [
    {label: 'New England Patriots', value: 0 },
    {label: 'Dallas Cowboys', value: 1 },
    {label: 'Los Angeles Chargers', value: 2 },
    {label: 'Atlanta Falcons', value: 3 }
];

export default class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            userId: this.props.navigation.state.params.userId,
            gameId: this.props.navigation.state.params.gameId,
            currentQuestion: "",
            choice: "",
            radio_props: [{label: 'Waiting For Questions....', value: 0 }],
            questionNumber: 1,
        }

        // Setup websocket
        socketurl = 'ws://ec2-18-221-200-72.us-east-2.compute.amazonaws.com:3000/';
        var endpoint = socketurl + 'game_socket/'+ this.state.gameId + '';
        console.log("Connecting to websocket at " + endpoint);
        this.socket = new WebSocket(endpoint);
        this.socket.onopen = () => {
            console.log("OPEN");
            // TODO add check if host, if not dont start just join
            this.startGame(this.props.navigation.state.params.gameId, this.props.navigation.state.params.userId)
            this.setState({connected: true});
        };
        this.socket.onmessage = (e) => {
            console.log("e.data === " + e.data);
            try {
                var data = JSON.parse(e.data);
                console.log("data === ");
                console.log(data.question);
                var choices = new Array();
                for (var i = 0; i < data.question.choices.length; i++) {
                    choices.push({label: data.question.choices[i], value: i });
                }
                this.setState({radio_props: choices});
            } catch (e) {
                console.log(e);
            }
        };
        this.socket.onclose = (e) => {
            console.log("CLOSING SOCKET")
            this.setState({connected: false});
        }

        this.emitResponse = this.emitResponse.bind(this)
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
                    // SUCCESS
                }
            })
    }

    emitResponse() {
        if (this.state.connected) {
            console.log("SENDING MESSAGE");
            this.socket.send(JSON.stringify({
                userId: this.state.userId,
                gameId: this.state.gameId,
                answer: this.state.choice
            }));
        }
    }

    render() {
        const { navigate } = this.props.navigation;
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
            <View style={styles.content}>
            <View style={styles.buttonArrange}>
            <Button
        raised
        buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
        textStyle={{textAlign: 'center', color: 'black'}}
        title={`Submit response`}
        onPress={async () => {
            const source = {
                uri: "https://www.soundjay.com/button/button-6.mp3"
            };

            try {
                await Audio.setIsEnabledAsync(true);
                const sound = new Audio.Sound();
                await sound.loadAsync(source);
                await sound.playAsync();
            } catch(error) {
                console.error(error);
            }
            navigate('Answer')
        }
                }
            />
            </View>
            </View>
            <View>
            <Text style={styles.gameContextText}>Question 1/10 | 1 point</Text>
            </View>
            <View style={styles.container}>
            <Button
        raised
        buttonStyle={{backgroundColor: 'white', borderRadius: 10, width: 200}}
        textStyle={{textAlign: 'center', color: 'black'}}
        title={`Go Back`}
        onPress={() => this.props.navigation.goBack()}/>
            </View>

        </Image>
    );
}
}

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
        marginTop: 20,
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

