import React, { Component } from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

const {width, height } = Dimensions.get('window')

const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;

const Style = StyleSheet.create({

    containter : {        
        borderWidth : 1 ,
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cssText : {
        borderWidth : 1 ,
        backgroundColor: 'green',
        width: DEVICE_WIDTH,
        textAlign: 'center',
    }

});

export default class PruebaScreenJheiner extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={Style.containter}>


                <Text style={Style.cssText}>Hola Jheiner</Text>
                <Text style={Style.cssText}>Hola Miguel</Text>
                <Text style={Style.cssText}>Hola Sergio</Text>
                <Text style={Style.cssText}>Hola PERU</Text>

            </View>
        
        
        )
    }

};