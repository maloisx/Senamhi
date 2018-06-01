MapasScreen

import React, { Component } from 'react';
import {StyleSheet, FlatList , ActivityIndicator , Text,  View , Image , Dimensions , ListView } from 'react-native';
import { Button , Card , Indicator , Typography , Switcher , TabButton} from 'nachos-ui'
import { Icon , Overlay } from 'react-native-elements'
import MapView ,{ Marker} from 'react-native-maps';


const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const v_AnchoObjeto = DEVICE_HEIGHT / 16;
const v_ColorText = 'white';


const images = { 
  'day1': require('../../public/images/day/1.png'), 
  'day2': require('../../public/images/day/2.png'),
  'day3': require('../../public/images/day/3.png'), 
  'day21': require('../../public/images/day/21.png'), 
  'day22': require('../../public/images/day/22.png'), 
  'day23': require('../../public/images/day/23.png'), 
  'day31': require('../../public/images/day/31.png'), 
  'day32': require('../../public/images/day/32.png'), 
  'day33': require('../../public/images/day/33.png'), 
  'day41': require('../../public/images/day/41.png'), 
  'day42': require('../../public/images/day/42.png'),
  'day43': require('../../public/images/day/43.png'), 
  'day51': require('../../public/images/day/51.png'), 
  'day52': require('../../public/images/day/52.png'),
  'day53': require('../../public/images/day/53.png'), 
  'day61': require('../../public/images/day/61.png'), 
  'day62': require('../../public/images/day/62.png'),
  'day63': require('../../public/images/day/63.png'), 
  'day71': require('../../public/images/day/71.png'), 
  'day72': require('../../public/images/day/72.png'),
  'day73': require('../../public/images/day/73.png'), 
  'day81': require('../../public/images/day/81.png'), 
  'day82': require('../../public/images/day/82.png'),
  'day83': require('../../public/images/day/83.png'), 
  'night1': require('../../public/images/night/1.png'), 
  'night2': require('../../public/images/night/2.png'),
  'night3': require('../../public/images/night/3.png'), 
  'night21': require('../../public/images/night/21.png'), 
  'night22': require('../../public/images/night/22.png'), 
  'night23': require('../../public/images/night/23.png'), 
  'night31': require('../../public/images/night/31.png'), 
  'night32': require('../../public/images/night/32.png'), 
  'night33': require('../../public/images/night/33.png'), 
  'night41': require('../../public/images/night/41.png'), 
  'night42': require('../../public/images/night/42.png'),
  'night43': require('../../public/images/night/43.png'), 
  'night51': require('../../public/images/night/51.png'), 
  'night52': require('../../public/images/night/52.png'),
  'night53': require('../../public/images/night/53.png'), 
  'night61': require('../../public/images/night/61.png'), 
  'night62': require('../../public/images/night/62.png'),
  'night63': require('../../public/images/night/63.png'), 
  'night71': require('../../public/images/night/71.png'), 
  'night72': require('../../public/images/night/72.png'),
  'night73': require('../../public/images/night/73.png'), 
  'night81': require('../../public/images/night/81.png'), 
  'night82': require('../../public/images/night/82.png'),
  'night83': require('../../public/images/night/83.png'),
 }

const style = StyleSheet.create({

  conteiner:{
    flex: 1 
  },
  btn_Variable:{
    height: v_AnchoObjeto * 1.3 ,
    width : DEVICE_WIDTH 
  },
  btnStyle:{ 
    margin: 5, 
    borderRadius: 5 ,    
  },
  btnTextStyle:{
    fontSize : v_AnchoObjeto * 0.3
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    //height: DEVICE_HEIGHT - (v_AnchoObjeto * 1) ,
    //width : DEVICE_WIDTH
  },
  txt_MarkerCiudad_fondo:{

  },
  txt_MarkerCiudad:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    //marginBottom: 10,
    backgroundColor: 'rgba(36, 97, 153, 0.7)',

  }

});


export default class MapasScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      selectedIndex: 'TEMPERATURA' ,
      region: {
        latitude: -12.0791,
        longitude: -77.0427,
        latitudeDelta: 4.0,
        longitudeDelta: 4.0,
      },
      data : Array(),
      isLoadingVisible : false , 
      isFirstLoad : true,
    }        
  }

  _changeStatesLoading(b){
    this.setState({ isLoadingVisible: b});
  }

  componentDidMount() {

    //this._changeStatesLoading(true);
    fetch('http://www.senamhi.gob.pe/sistemas/smartmet/?ws=puntos_mapa')
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.setState({
        data: responseJson
      });

      //this._changeStatesLoading(false);  
    })
    .catch((error) =>{
      //this._changeStatesLoading(false);  
      console.error(error);
    });

  }

    componentWillUnmount() {
      this.setState({
        data: Array(),
      });
    }

  onRegionChange(region) {
    this.setState({ region });
  }
 
  render() {

    return (
      
      <View style={style.conteiner}>

       

        <MapView
          style={style.map}
          initialRegion={this.state.region}
          //onRegionChange={this.onRegionChange}
        >

          {/*<MapView.Marker  coordinate={{latitude: -12.0791,longitude: -77.0427}}>
            <View>
                  <Image 
                    style={{height: v_AnchoObjeto , width: v_AnchoObjeto  }}
                    resizeMode="cover" 
                    source={images['day1']} 
                />
              
                <Text style={style.txt_MarkerCiudad}>ciudad xxx</Text>              
            </View>
          </MapView.Marker>
          */}
          {this.state.data.map(marker => (
                                            <MapView.Marker  
                                                coordinate={{latitude: parseFloat(marker.LAT),longitude: parseFloat(marker.LON)}}
                                                title={marker.CIUDAD}
                                                key={marker.CIUDAD}
                                                //image={ images[marker.TURNO + parseInt(marker.ICON)]}
                                                /*description={ 
                                                              "Temperatura: "+ marker.TEMPERATURA + "°" + "\n" +
                                                              "Precipitacion: " + marker.PRECIP_1H + "°" + "\n" +
                                                              "Vel. Viento: " + marker.VIENTO_VEL + " m/s" + "\n" +
                                                              "Vel. Viento: " + marker.VIENTO_DIR + "" 
                                                            }*/
                                            >
                                            <Image
                                              source={images[marker.TURNO + parseInt(marker.ICON)]}
                                              style={{ width: v_AnchoObjeto * 1.5, height: v_AnchoObjeto * 1.5 }} 
                                            />

                                            <MapView.Callout tooltip>                                              
                                                <View style={{ width: 150, alignSelf: 'center', borderWidth: 1, backgroundColor: '#fff' , borderRadius:10, }}>
                                                <Text style={{ alignSelf: 'center' , fontWeight:'bold' }}>
                                                {marker.CIUDAD}
                                                </Text>          
                                                  <Text style={{ alignSelf: 'center' }}>
                                                       {"Temperatura:"+ marker.TEMPERATURA + "°" + "\n" +
                                                              "Precipitacion: " + marker.PRECIP_1H + "" + "\n" +
                                                              "Vel. Viento: " + marker.VIENTO_VEL + " m/s" + "\n" +
                                                              "Dir. Viento: " + marker.VIENTO_DIR + ""}
                                                  </Text>
                                                </View>
                                                <View style={[{flex:1,justifyContent: 'center', alignItems: 'center'}]}>              
                                                      <View style={{width: 0, justifyContent: 'center',alignItems: 'center' ,
                                                                  height: 0,
                                                                  borderWidth: 1,
                                                                  backgroundColor: 'transparent',
                                                                  borderStyle: 'solid',
                                                                  borderLeftWidth: 5,
                                                                  borderRightWidth: 5,
                                                                  borderBottomWidth: 10,
                                                                  borderLeftColor: 'transparent',
                                                                  borderRightColor: 'transparent',
                                                                  borderBottomColor: 'black',
                                                                  transform: [
                                                                    {rotate: '180deg'}
                                                                  ]}} />
                                                    </View>


                                            </MapView.Callout>

                                            
                                          </MapView.Marker>
                                          )
                                )
          }

        </MapView>
        </View>

    )
  }
};

 