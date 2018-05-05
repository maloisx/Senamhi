MapasScreen

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }

});

export default class MapasScreen extends Component {
  render() {


    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -12.0791,
          longitude: -77.0427,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    )
  }
};

 