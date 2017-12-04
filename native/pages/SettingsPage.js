// import react and needed components 
import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, AsyncStorage, ImageBackground, Alert} from 'react-native'
import {Button} from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Rating, Slider } from 'react-native-elements';

const remotebackg = 'https://i.imgur.com/vqTkUz8.png'; // background image 

// create and export page for settings page 
export default class SettingsPage extends React.Component {
    constructor(props){
        super(props)

    }

    // method for changing difficulty 
    difficultyChanged(rating) {
      if(rating == 0)
        rating =1
      console.log("Difficulty is: " + rating) // log for debugging 
      try{
        Alert.alert('Difficulty rating: ' + JSON.stringify(rating))        
        AsyncStorage.setItem('difficulty', JSON.stringify(rating));
      }
      catch (error) {
          Alert.alert("Error saving data");
      } 
    }

    // method for changing the number of questions 
    numberOfQuestionsChanged(scale){
      console.log("Number of questions is: " + scale) // log for debugging 
      
      try{
        Alert.alert('Question count: ' + JSON.stringify(scale))
        AsyncStorage.setItem('questionCount', JSON.stringify(scale));
      }
      catch (error) {
          Alert.alert("Error saving data");
      } 
    }

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
            
          {/* format text for headings above components */}
          <Text
            style={{
              backgroundColor: 'transparent',
              textAlign: 'center',
              fontSize: 45,
              color: 'white',
              padding: 40,
            }}
          >
            {'Settings'}

            </Text>

            <Text
              style={{ backgroundColor: 'transparent',
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
              padding: 0,
            }}
            >
            {'Difficulty Rating'}
            </Text>

            <Rating // rating component from react elements 
              type="rocket"
              fractions={0}
              ratingCount={3}
              startingValue={1}
              imageSize={50}
              ratingBackgroundColor='transparent'
              onFinishRating={this.difficultyChanged} // call method for difficulty changed 
              style={{ backgroundColor: 'transparent', paddingVertical: 10, alignItems: 'center' }}
            />

            <Text
              style={{ backgroundColor: 'transparent',
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
              paddingTop: 10,
            }}
            >
            {'Number of Questions'}
            </Text>

            <Slider // slider component from react native elements 
                value={10}
                minimumValue={1}
                maximumValue={15}
                step={1}
                onSlidingComplete={(value) => this.numberOfQuestionsChanged(value)} // call method for number of questions changed 
                style={{padding: 10}}
              />

        <View style={styles.buttonArrange}>
        <Button
            raised
            title={'Go Back'}
            buttonStyle={styles.buttons}
            textStyle={{textAlign: 'center', color: 'black', backgroundColor: 'transparent'}}
            // go back to previous page 
            onPress={() => this.props.navigation.goBack()}  />
        </View>
        </ImageBackground>
        )
    }
}

// style sheet for page 
const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 100
  }
})
