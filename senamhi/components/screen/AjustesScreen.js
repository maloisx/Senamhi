import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native';
import Carousel from 'react-native-carousel-view';

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    borderWidth: 2,
    borderColor: '#CCC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class AjustesScreen extends Component {
  render() {
    return (
        
              <View style={styles.contentContainer}>
                <Text>Page ajustes</Text>
              </View>
              
    )
  }
};

 