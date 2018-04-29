import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View , Image , Dimensions  
} from 'react-native';

const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const style = {
  container: {
    flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center'    
  }
}
 
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {}    
      }

    static navigationOptions = {
        title: 'SENAMHI'
    };


  render() {
    return (
      <View style={style.container}>
         <Text>
              main de prueba!!
          </Text>

      </View> 
    );
  }
}


