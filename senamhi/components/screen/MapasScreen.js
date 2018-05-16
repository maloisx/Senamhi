MapasScreen

import React, { Component } from 'react';
import {StyleSheet, FlatList , ActivityIndicator , Text,  View , Image , Dimensions , ListView } from 'react-native';
import { Button , Card , Indicator , Typography , Switcher , TabButton} from 'nachos-ui'
import MapView from 'react-native-maps';

const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const v_AnchoObjeto = DEVICE_HEIGHT / 16;
const v_ColorText = 'white';

const style = StyleSheet.create({

  conteiner:{
    flex: 1 
  },
  btn_Variable:{
    height: v_AnchoObjeto * 1 ,
    width : DEVICE_WIDTH 
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    height: DEVICE_HEIGHT - (v_AnchoObjeto * 1) ,
    width : DEVICE_WIDTH
  }

});

export default class MapasScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabSelector : 'temperatura',
    }    
  }

  render() {

    return (
      
      <View style={style.conteiner}>

        <View  style={style.btn_Variable}>
            <Switcher
              onChange={tabSelector => this.setState({ tabSelector })}
              defaultSelected={this.state.tabSelector}
            >
              <TabButton value='temperatura' text='temperatura' iconName='md-volume-off'  />
              <TabButton value='precipitacion'   text='precipitacion' iconName='md-walk' />
              <TabButton value='vientos'   text='vientos' iconName='md-wine' />
            </Switcher>
        </View>

        <MapView
          style={style.map}
          initialRegion={{
            latitude: -12.0791,
            longitude: -77.0427,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    </View>

    )
  }
};

 