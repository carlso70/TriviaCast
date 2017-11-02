import React, {Component} from 'react'
import {Image} from 'react-native';

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

export default Background;
