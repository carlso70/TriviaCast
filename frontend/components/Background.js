// import react and needed componenets
import React, {Component} from 'react'
import {Image} from 'react-native';

// make default component for the background image 
const remotebackg = 'https://i.imgur.com/vqTkUz8.png';
const Background = () => {
    return(
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
            />
    );
}

// export background
export default Background;
