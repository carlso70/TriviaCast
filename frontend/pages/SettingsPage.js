import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { Button } from 'react-native-elements'

const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Rating, Slider } from 'react-native-elements';

export default class SettingsPage extends React.Component {
    constructor(props){
        super(props)
        
    }

    difficultyChanged(rating) {
      console.log("Difficulty is: " + rating)
    }

    numberOfQuestionsChanged(scale){
      console.log("Number of questions is: " + scale)
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

            <Rating
              type="rocket"
              fractions={0}
              ratingCount={3}
              startingValue={1}
              imageSize={50}
              ratingBackgroundColor='transparent'
              onFinishRating={this.difficultyChanged}
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

            <Slider 
                value={10}
                minimumValue={1}
                maximumValue={25}
                step={1}
                onSlidingComplete={(value) => this.numberOfQuestionsChanged(value)} 
                style={{padding: 10}}              
              />
        
        <View style={styles.buttonArrange}>
        <Button title="Go Back" onPress={() => this.props.navigation.goBack()} /> 
        </View>
        </Image>
        )
    }
}

const styles = StyleSheet.create({
  buttonArrange: {
      alignItems: 'center',
      paddingBottom: 4
  }
});