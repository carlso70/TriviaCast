// import react and needed components 
import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, AsyncStorage, ImageBackground, DeviceEventEmitter, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Chromecast from "react-native-google-cast";

const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; // background image 

// create and export page for settings page 
export default class ChromeCastPage extends React.Component {
    constructor(props){
        super(props)
        this.chromecastCastMedia = this.chromecastCastMedia.bind(this);         
        this.getChromecasts = this.getChromecasts.bind(this);
        this.disconnectChromecast = this.disconnectChromecast.bind(this);
        this.renderDisconnect = this.renderDisconnect.bind(this);
        this.state = {
          chromecastAround: false,
          connected: false,
          chromecastList: []
        }
    }

    componentDidMount() {
        Chromecast.startScan();
        DeviceEventEmitter.addListener(Chromecast.DEVICE_AVAILABLE, (existance) => this.setState({chromecastAround: existance.device_available}));
        DeviceEventEmitter.addListener(Chromecast.MEDIA_LOADED, () => {});
        DeviceEventEmitter.addListener(Chromecast.DEVICE_CONNECTED, () => {this.chromecastCastMedia()});
        DeviceEventEmitter.addListener(Chromecast.DEVICE_DISCONNECTED, () => alert('Device disconnected!'));
    }

    disconnectChromecast(){
        Chromecast.disconnect();
        this.setState({connected: false});
    }

    async getChromecasts() {
        let chromecastDevices = await Chromecast.getDevices();
        this.setState({chromecastList: chromecastDevices});
    }

    chromecastCastMedia() {
        this.setState({connected: true});
        Chromecast.castMedia('http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4', 'Video Test', 'http://camendesign.com/code/video_for_everybody/poster.jpg', 0);
    };

    async connectToChromecast(id) {
        const isConnected = await Chromecast.isConnected();
        isConnected ? this.chromecastCastMedia() : Chromecast.connectToDevice(id);
    }

    renderChromecastList(chromecast) {
        return (
          <TouchableOpacity
            style={[styles.button, styles.chromecastButton]}
            onPress={() => this.connectToChromecast(chromecast.id)}
            key={chromecast.id}>
            <Text style={styles.textButton}>
              {chromecast.name}
            </Text>
          </TouchableOpacity>);
    }

    renderDisconnect(){
        if(!this.state.connected) return null;
        return(
          <TouchableOpacity onPress={this.disconnectChromecast} style={[styles.button, styles.disconnectButton]}>
            <Text style={styles.textButton}>Disconnect</Text>
          </TouchableOpacity>
        );
    }

    renderControl(){
        if(!this.state.connected) return null;
        return(
          <TouchableOpacity onPress={Chromecast.togglePauseCast} style={[styles.button, styles.backgroundColor]}>
            <Text style={styles.textButton}>Play/Pause</Text>
          </TouchableOpacity>
        );
    }

    render() {
        return (
          <ImageBackground
	      style={{
		backgroundColor: '#ccc',
		flex: 1,
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	      }}
	    source={{ uri: remotebackg }}
	  >
	  <View style={styles.container}>
            <Text style={styles.chromecastAround}>{this.state.chromecastAround ? 'Click the ChromeCast below' : 'There are no ChromeCasts currently available' }</Text>
            <TouchableOpacity onPress={this.getChromecasts} style={[styles.button]}>
              <Text>Show chromecasts</Text>
            </TouchableOpacity>
            {this.state.chromecastList.map((item, index) => this.renderChromecastList(item, index)) }
            {this.renderDisconnect()}
            {this.renderControl()}
          </View>
	  </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chromecastAround: {
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    backgroundColor: '#42A5F5'
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  chromecastButton: {
    backgroundColor: '#EC407A',
    marginVertical: 10,
  },
  disconnectButton: {
    marginVertical: 10,
    backgroundColor: '#f44336',
  },
  controlButton: {
    marginVertical: 10,
    backgroundColor: '#689F38'
  }
});
