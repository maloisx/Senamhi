import {
    StackNavigator
} from 'react-navigation';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    View, Image , Dimensions , AsyncStorage  , Platform
} from 'react-native'

import { RNViewShot , captureScreen } from "react-native-view-shot";
import Share, {ShareSheet, Button} from 'react-native-share';

import { Icon } from 'react-native-elements'


import React from 'react';

import DrawerScreen from './drawerScreen';

const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width


const DrawerNavigation = StackNavigator({
    DrawerStack: {screen: DrawerScreen}
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: '#246199',
            paddingLeft: 10,
            paddingRight: 10
        },
        
        gesturesEnabled: false,
        title: "SENAMHI"  ,
        headerTintColor: 'white',
        headerLeft: <View>
            <TouchableHighlight 
                onPress={() => {
                    if(navigation.state.index === 0){
                        navigation.navigate('DrawerOpen');
                    } else {
                        navigation.navigate('DrawerClose'); 
                    }
                }}>
                <Image 
                    style={{height: 32 , width: 32 }}
                    resizeMode="cover" 
                    source={require('../../public/images/menu_icon.png')} 
                />
            </TouchableHighlight>
        </View> ,
        headerRight : <Icon
                        //reverse
                        name='share'
                        type='FontAwesome'
                        color='#ffffff'                        
                        onPress={() => {
                                        var plat = Platform.OS ;
                                        console.log('compartir para: ' + plat); 
                                        
                                        captureScreen({
                                              format: "jpg",
                                              quality: 0.8
                                            })
                                            .then(      
                                              uri => {
                                                      console.log(uri);
                                                      var shareOptions = {
                                                        title: "SENAMHI APP",
                                                        message: "Pronostico del tiempo desde el SENAMHI APP.",
                                                        url: uri,
                                                        subject: "PRONOSTICO DEL TIEMPO" //  for email
                                                      };
                                                      Share.open(shareOptions);
                                                    },
                                              error => console.error("Oops, Something Went Wrong", error)
                                            ); 
                                        }
                                }  />
    })
})

export default DrawerNavigation;