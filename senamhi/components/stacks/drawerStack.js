import {
    StackNavigator
} from 'react-navigation';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    View, Image , Dimensions , AsyncStorage
} from 'react-native'


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
        </View>
    })
})

export default DrawerNavigation;