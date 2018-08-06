MapasScreen

import React, { Component } from 'react';
import {StyleSheet, FlatList , ActivityIndicator , Text,  View , Image , Dimensions , ListView } from 'react-native';
import { Badge, Card , Indicator , Typography , Switcher , TabButton} from 'nachos-ui'
import { Button ,  Avatar , Icon , Overlay } from 'react-native-elements'
import MapView ,{ Marker} from 'react-native-maps';


const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const v_AnchoObjeto = DEVICE_HEIGHT / 16;
const v_ColorText = 'white';


const images = { 
  '01': require('../../public/images/icons/01.png'), 
  '02': require('../../public/images/icons/02.png'),
  '03': require('../../public/images/icons/03.png'), 
  '04': require('../../public/images/icons/04.png'), 
  '05': require('../../public/images/icons/05.png'), 
  '06': require('../../public/images/icons/06.png'), 
  '07': require('../../public/images/icons/07.png'), 
  '08': require('../../public/images/icons/08.png'), 
  '09': require('../../public/images/icons/09.png'), 
  '10': require('../../public/images/icons/10.png'), 
  '11': require('../../public/images/icons/11.png'),
  '12': require('../../public/images/icons/12.png'), 
  '13': require('../../public/images/icons/13.png'), 
  '14': require('../../public/images/icons/14.png'),
  '15': require('../../public/images/icons/15.png'), 
  '16': require('../../public/images/icons/16.png'), 
  '17': require('../../public/images/icons/17.png'),
  '18': require('../../public/images/icons/18.png'), 
  '19': require('../../public/images/icons/19.png'), 
  //'20': require('../../public/images/icons/20.png'),
  '21': require('../../public/images/icons/21.png'), 
  '22': require('../../public/images/icons/22.png'), 
  '23': require('../../public/images/icons/23.png'),
  '24': require('../../public/images/icons/24.png'), 
  '25': require('../../public/images/icons/25.png'), 
  '26': require('../../public/images/icons/26.png'),
  '27': require('../../public/images/icons/27.png'), 
  '28': require('../../public/images/icons/28.png'), 
  '29': require('../../public/images/icons/29.png'), 
  //'30': require('../../public/images/icons/30.png'),
  '31': require('../../public/images/icons/31.png'), 
  '32': require('../../public/images/icons/32.png'), 
  '33': require('../../public/images/icons/33.png'),
  '34': require('../../public/images/icons/34.png'), 
  '35': require('../../public/images/icons/35.png'), 
  '36': require('../../public/images/icons/36.png'),
  '37': require('../../public/images/icons/37.png'), 
  '38': require('../../public/images/icons/38.png'), 
  '39': require('../../public/images/icons/39.png'), 
  '40': require('../../public/images/icons/40.png'),
  '41': require('../../public/images/icons/41.png'), 
  '42': require('../../public/images/icons/42.png'), 
  '43': require('../../public/images/icons/43.png'),
  '44': require('../../public/images/icons/44.png'), 
 }

 var color_temp =[
                  {min: -26,max: -24,color: '#410042',colorTxt: '#ffffff'},
                  {min: -24,max: -22,color: '#620065',colorTxt: '#ffffff'},
                  {min: -22,max: -20,color: '#a600ac',colorTxt: '#ffffff'},
                  {min: -20,max: -18,color: '#820082',colorTxt: '#ffffff'},
                  {min: -18,max: -16,color: '#5d003a',colorTxt: '#ffffff'},
                  {min: -16,max: -14,color: '#362e72',colorTxt: '#ffffff'},
                  {min: -14,max: -12,color: '#002ea0',colorTxt: '#ffffff'},
                  {min: -12,max: -10,color: '#0000cf',colorTxt: '#ffffff'},
                  {min: -10,max: -8,color: '#0000ff',colorTxt: '#ffffff'},
                  {min: -8,max:  -6,color: '#004fff',colorTxt: '#ffffff'},
                  {min: -6,max:  -4,color: '#009bfb',colorTxt: '#ffffff'},
                  {min: -4,max:  -2,color: '#14cdff',colorTxt: '#000000'},
                  {min: -2,max:   0,color: '#53ffff',colorTxt: '#000000'},
                  {min: 0 ,max:   2,color: '#5bff9f',colorTxt: '#000000'},
                  {min: 2 ,max:   4,color: '#5aff5c',colorTxt: '#000000'},
                  {min: 4 ,max:   6,color: '#60f900',colorTxt: '#000000'},
                  {min: 6 ,max:   8,color: '#c1ff00',colorTxt: '#000000'},
                  {min: 8 ,max:  10,color: '#ffff00',colorTxt: '#000000'},
                  {min: 10,max:  12,color: '#fcff72',colorTxt: '#000000'},
                  {min: 12,max:  14,color: '#fdeb3d',colorTxt: '#000000'},
                  {min: 14,max:  16,color: '#ffc700',colorTxt: '#000000'},
                  {min: 16,max:  18,color: '#ff9800',colorTxt: '#000000'},
                  {min: 18,max:  20,color: '#ff6800',colorTxt: '#ffffff'},
                  {min: 20,max:  22,color: '#fa4e2f',colorTxt: '#ffffff'},
                  {min: 22,max:  24,color: '#fd3000',colorTxt: '#ffffff'},
                  {min: 24,max:  26,color: '#f90000',colorTxt: '#ffffff'},
                  {min: 26,max:  28,color: '#cd0000',colorTxt: '#ffffff'},
                  {min: 28,max:  30,color: '#a30000',colorTxt: '#ffffff'},
                  {min: 30,max:  32,color: '#6a0100',colorTxt: '#ffffff'},
                  {min: 32,max:  34,color: '#4c0300',colorTxt: '#ffffff'},
                  {min: 34,max:  36,color: '#000000',colorTxt: '#ffffff'},
                  ] ;
var color_hum =[{min: 0,max: 101,color: '#66ccff',colorTxt: '#000000'},];                  
var color_vie =[{min: -500,max: 500,color: '#00ffcc',colorTxt: '#000000'},];                 


const style = StyleSheet.create({

  conteiner:{
    flex: 1 
  },
  border:{
    borderWidth: 1,
    borderColor: '#ffffff'    
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

  },view_btn_maps: {
    position: 'absolute',
    //flex: 1, 
    flexDirection: 'column',
    //height: DEVICE_HEIGHT ,
    width : v_AnchoObjeto * 2.4 ,  
    justifyContent: 'flex-start', 
    alignItems: 'flex-end',
    //margin: v_AnchoObjeto / 4  ,
    top: 10,
    left: DEVICE_WIDTH - (v_AnchoObjeto * 2.4 ) - 10,
  }  ,
  btn_mapa :{
    width : v_AnchoObjeto * 2.4 ,
    //marginRight: 25,
    marginBottom: 5, 
  },
  btn_mapa_txt :{
    fontSize:v_AnchoObjeto*0.3 ,
  }

});


export default class MapasScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {      
      selectedIndex: 'TEMPERATURA' ,
      zoomMin: 5,
      zoomMax:11,
      zoom : 5, 
      
      Nivel_1_Data_Mapa : Array(),
      Nivel_2_Data_Mapa : Array(),
      
      region: {
        latitude: -8.566450702886133 , //-12.0791,
        longitude: -74.50044918805361 , //-77.0427,
        latitudeDelta: 24.145768629242497, // 4.0
        longitudeDelta: 15.820311829447746, // 4.0
      },
      data : Array(),
      isLoadingVisible : false , 
      isFirstLoad : true,

      ViewMapIconImg : true,
      ViewMapIconTemp : false,
      ViewMapIconHum : false,
      ViewMapIconVie : false,
      ViewMapIconUV : false,

    }        
  }
 
  _changeStatesLoading(b){
    this.setState({ isLoadingVisible: b});
  }

  _ws(ws_url , ws_params){
    var response = Array();
    var formBody = [];
    for (var property in ws_params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(ws_params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch(ws_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
      .then((response) => response.json())
      .then((responseJson) => {
         //console.log(responseJson);        
         return responseJson;      
      })
      .catch((error) =>{
        console.error("x2>>>>"+error);
      });      
    }

  _ChangeIconsMaps(Tipo){

    if(Tipo == 'icons'){
      this.setState({
        ViewMapIconImg : true,
        ViewMapIconTemp : false,  
        ViewMapIconHum : false,
        ViewMapIconVie : false,
        ViewMapIconUV : false,   
       });
    }if(Tipo == 'temp'){
      this.setState({
        ViewMapIconImg : false,
        ViewMapIconTemp : true,
        ViewMapIconHum : false,
        ViewMapIconVie : false,
        ViewMapIconUV : false,     
       });
    }if(Tipo == 'hum'){
      this.setState({
        ViewMapIconImg : false,
        ViewMapIconTemp : false,
        ViewMapIconHum : true,
        ViewMapIconVie : false,
        ViewMapIconUV : false,     
       });
    }if(Tipo == 'vie'){
      this.setState({
        ViewMapIconImg : false,
        ViewMapIconTemp : false,
        ViewMapIconHum : false,
        ViewMapIconVie : true,
        ViewMapIconUV : false,     
       });
    }if(Tipo == 'uv'){
      this.setState({
        ViewMapIconImg : false,
        ViewMapIconTemp : false,
        ViewMapIconHum : false,
        ViewMapIconVie : false,
        ViewMapIconUV : true,     
       });
    }

  }
  
  _BuscarColorIconMapa(Tipo, valor){
    var color = '#ffffff';
    if(Tipo == 'temp'){
      for(var i = 0 ; i < color_temp.length ; i++ ){
        if( valor >= color_temp[i].min && valor < color_temp[i].max ) {
          color = color_temp[i].color;
          break;   
        }
      }
    }if(Tipo == 'hum'){
      for(var i = 0 ; i < color_hum.length ; i++ ){
        if( valor >= color_hum[i].min && valor < color_hum[i].max ) {
          color = color_hum[i].color;
          break;   
        }
      }
    }if(Tipo == 'vie'){
      for(var i = 0 ; i < color_vie.length ; i++ ){
        if( valor >= color_vie[i].min && valor < color_vie[i].max ) {
          color = color_vie[i].color;
          break;   
        }
      }
    }
    return color;
  }
  _BuscarColorTextMapa(Tipo, valor){
    var color = '#000000';
    if(Tipo == 'temp'){
      for(var i = 0 ; i < color_temp.length ; i++ ){
        if( valor >= color_temp[i].min && valor < color_temp[i].max ) {
          color = color_temp[i].colorTxt;
          break;   
        }
      }
    }if(Tipo == 'hum'){
      for(var i = 0 ; i < color_hum.length ; i++ ){
        if( valor >= color_hum[i].min && valor < color_hum[i].max ) {
          color = color_hum[i].colorTxt;
          break;   
        }
      }
    }if(Tipo == 'vie'){
      for(var i = 0 ; i < color_vie.length ; i++ ){
        if( valor >= color_vie[i].min && valor < color_vie[i].max ) {
          color = color_vie[i].colorTxt;
          break;   
        }
      }
    }
    return color;
  }

  componentDidMount() {

    /*
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
    });*/
    var ws_params = {
      'p_schema': 'appsenamhi',
       'p_pkg': 'PKG.SP_OBT_CIUDAD_MAPA',
       'p_param': '[]',
       //'p_param' : '["-13.0803167","-77.0391641"]'
     };             
    this._ws('http://sgd.senamhi.gob.pe/ws/rest/open/ora', ws_params)
    .then(ws_data => {
      console.log(ws_data.data);

      var data_mapa_1 = Array();
      var data_mapa_2 = Array();
      for(var i = 0 ; i < ws_data.data.length ; i++ ){
        if(ws_data.data[i].NIVEL == '1'){
          data_mapa_1.push(ws_data.data[i]);
        }   
        if(ws_data.data[i].NIVEL == '2'){
          data_mapa_2.push(ws_data.data[i]);
        }      
      }

      this.setState({
        data_total: ws_data.data,     
        data : data_mapa_1,     
        Nivel_1_Data_Mapa : data_mapa_1,          
        Nivel_2_Data_Mapa : data_mapa_2,     
       });
    });

  }

    componentWillUnmount() {
      this.setState({
        data: Array(),
      });
    }

  _ChangeZoomData(v_Nivel){
    console.log('cambiando nivel a: '+v_Nivel);
    
    if(v_Nivel == '1')
      data_mapa = this.state.Nivel_1_Data_Mapa;
    if(v_Nivel == '2')
      data_mapa = this.state.Nivel_2_Data_Mapa;

    this.setState({   
      data : data_mapa,          
     });
  }

  onRegionChange(region) {
    //console.log(region);
    let v_zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    //console.log("mapa: " +v_zoom);
    var zoom_act = this.state.zoom;
    //console.log("actual: " +zoom_act);
    if(this.state.zoom != v_zoom){
      console.log('cambio zoom de '+ this.state.zoom + ' a '+ v_zoom);
      if(v_zoom >= this.state.zoomMin && v_zoom <= 6){ 
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx');
        this._ChangeZoomData('1');
      }
      if(v_zoom >= 7 && v_zoom <= this.state.zoomMax){
        console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyy');
        this._ChangeZoomData('2');
      }
      this.setState({   
        zoom : v_zoom,          
       });
    }

  }

  _BuscarPosicion(){
    console.log('ubicando');
    navigator.geolocation.getCurrentPosition(
      (position) => {
       
        var v_region = {
          latitude: position.coords.latitude , //-12.0791,
          longitude: position.coords.longitude , //-77.0427,
          latitudeDelta: 4.0,
          longitudeDelta:  4.0,
        } ;
        this.setState({
          region: v_region,
        });        
      },
      (error) =>{ 
                  console.log("->"+error.message);
                  this.setState({ error: error.message } )   
                },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );

  }
 
  render() {

    return (
      
      <View style={style.conteiner}>
        
        <MapView
          style={style.map}
          initialRegion={this.state.region}
          //onRegionChange={(region) => this.onRegionChange(region)}
          //minZoomLevel={this.state.zoomMin}
          //maxZoomLevel={this.state.zoomMax}
        >

          {this.state.data.map(marker => (
                                            <MapView.Marker  
                                                coordinate={{latitude: parseFloat(marker.LAT),longitude: parseFloat(marker.LON)}}
                                                title={marker.CIUDAD}
                                                key={marker.COD_CIUDAD}
                                            >
                                            
                                            { this.state.ViewMapIconImg && ( 
                                                                          <Image
                                                                            source={images[marker.ICON]}
                                                                            style={{ width: v_AnchoObjeto * 1.5, height: v_AnchoObjeto * 1.5 }} 
                                                                          /> 
                                                                          )}
                                            { this.state.ViewMapIconTemp && (                                                                           
                                                                            <Badge value={parseInt(marker.TEMP) + '°'} color={this._BuscarColorIconMapa('temp',marker.TEMP)} textStyle={{color : this._BuscarColorTextMapa('temp',marker.TEMP)}} style={{ marginRight: 15 }} />  
                                                                            )}
                                            { this.state.ViewMapIconHum && (                                                                           
                                                                            <Badge value={parseInt(marker.HUM) + '%'} color={this._BuscarColorIconMapa('hum',marker.HUM)} textStyle={{color : this._BuscarColorTextMapa('hum',marker.HUM)}} style={{ marginRight: 15 }} />  
                                                                            )}
                                            { this.state.ViewMapIconVie && (                                                                           
                                                                            <Badge value={parseInt(marker.VIE)+' m/s'} color={this._BuscarColorIconMapa('vie',marker.VIE)} textStyle={{color : this._BuscarColorTextMapa('vie',marker.VIE)}} style={{ marginRight: 15 }} />  
                                                                            )}
                                            { /*this.state.ViewMapIconUV && (                                                                           
                                                                            <Badge value={marker.TEMP} color={this._BuscarColorIconMapa('uv',marker.HUM)} textStyle={{color : this._BuscarColorTextMapa('uv',marker.TEMP)}} style={{ marginRight: 15 }} />  
                                                                            )*/}                                                                                        
                                                        
                                            <MapView.Callout tooltip>                                              
                                                <View style={{ width: 150, alignSelf: 'center', borderWidth: 1, backgroundColor: '#fff' , borderRadius:10, }}>
                                                <Text style={{ alignSelf: 'center' , fontWeight:'bold' }}>
                                                {marker.CIUDAD}
                                                </Text>          
                                                  <Text style={{ alignSelf: 'center' }}>
                                                       {"Temperatura:"+ marker.TEMP + "°" + "\n" +
                                                              "Humedad: " + marker.HUM + "%" + "\n" +
                                                              "Vel. Viento: " + marker.VIE + " m/s"}
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

          <View style={[style.view_btn_maps,style.border]}>
              <Button
                containerStyle={style.btn_mapa}
                titleStyle={style.btn_mapa_txt}
                title='Iconos'
                onPress={()=>this._ChangeIconsMaps('icons')}
              />
              <Button
                containerStyle={style.btn_mapa}
                titleStyle={style.btn_mapa_txt}
                title='Temperatura'
                onPress={()=>this._ChangeIconsMaps('temp')}
              />
              <Button
                containerStyle={style.btn_mapa}
                titleStyle={style.btn_mapa_txt}
                title='Humedad'
                onPress={()=>this._ChangeIconsMaps('hum')}
              />
              <Button
                containerStyle={style.btn_mapa}
                titleStyle={style.btn_mapa_txt}
                title='Vel. Viento'
                onPress={()=>this._ChangeIconsMaps('vie')}
              />
              {/*
              <Button
                containerStyle={style.btn_mapa}
                titleStyle={style.btn_mapa_txt}
                title='UV'
              />*/}
          </View>

          <View style={{
                        height: v_AnchoObjeto ,
                        width : DEVICE_WIDTH ,  
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginBottom: v_AnchoObjeto / 2  ,
                        flexDirection: 'column'
                      }}>
              {/*
              <Button
                containerStyle={style.btn_mapa}
                titleStyle={style.btn_mapa_txt}
                title=''
                icon={
                  <Icon
                    name='my-location'
                    color='white'
                  />
                }
                onPress={()=>this._BuscarPosicion()}
              />
              */}          
                       
              
          </View>

        </View>

    )
  }
};

 