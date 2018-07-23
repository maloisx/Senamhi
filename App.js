/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View  
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Splash from './senamhi/components/screen/Splash'
import DrawerStack from './senamhi/components/stacks/drawerStack'


const RootStack =  StackNavigator(
  {
    Splash: {
      screen: Splash 
    }
    ,DrawerStack: {
      screen: DrawerStack
    }
    
  },  
  {
    //mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Splash',
    //gesturesEnabled: false,
  }
);

export default class App extends Component {
  
  render() {
    return <RootStack/>;
  }
}

