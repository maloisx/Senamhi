import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View , Image , Dimensions , Navigator , AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';

//import Main from '../components/main'

const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const style = {
  conteiner:{
    flex: 1 
    
  },
  Splash: {
    flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row'
    
  },
  backgroundImage : {
    position: 'absolute',
    top: 0,
    left : 0,
    height: DEVICE_HEIGHT,
    width : DEVICE_WIDTH    
  },
  img_logo : {
    //position: 'absolute',
    //top: 0,
    //left : 0,
    height: DEVICE_HEIGHT * 0.55 ,
    width : DEVICE_WIDTH * 0.55   
  },
  txt_version : {
      color: 'white',
      fontSize: 15 , 
      marginTop: DEVICE_HEIGHT * 0.25 /2 ,
      marginLeft: -10

  }
}



export default class Splash extends Component {

  
  constructor(props) {
    super(props);
    this.state = { title: 'SENAMHI'  }    
    AsyncStorage.setItem("@xxx", "CARAJO");
  }
  componentDidMount(){
     // esperamos 2 segundos para pasar del splash al drawerStack que contikene el menu
      var nav = this.props.navigation;
      setTimeout(function(){ 
        nav.navigate('DrawerStack')  , this.state
      }, 50); //2000
  }

  render() {
    
    const version = '1.0';

    return (
      <View style={style.conteiner}>
        <Image 
        style={style.backgroundImage}
        resizeMode="cover" 
        source={require('../../public/images/fondo.jpg')} 
        />

        <View style={style.Splash} >
          <Image 
            style={style.img_logo}
            resizeMode="contain" 
            source={require('../../public/images/logo.png')}             
          />
          <Text style={style.txt_version}>
              v {version}
          </Text>
        </View>

      </View> 
    );
  }
}


