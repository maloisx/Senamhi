import React, { Component } from 'react';
import {StyleSheet, FlatList , ActivityIndicator , Text,  View , Image , Dimensions , ListView , AsyncStorage} from 'react-native';

const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const v_AnchoObjeto = DEVICE_HEIGHT / 16;
const v_ColorText = 'white';
const v_PronosticoSemanal_WIDTH = DEVICE_WIDTH * 0.8;
const style = {
  conteiner:{
    flex: 1 
  },
  conteiner_form:{
    flex: 1 ,   
    flexDirection: 'column'
  },
  border:{
    borderWidth: 0,
    borderColor: '#ffffff'    
  },
  borderBotton:{
    borderBottomWidth: 0.2,
    borderColor: '#ffffff'    
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'#ffffff',
    margin:5,
  },
  backgroundImage : {
    position: 'absolute',
    top: 0,
    left : 0,
    height: DEVICE_HEIGHT,
    width : DEVICE_WIDTH    
  },
  vw_AniadirCiudad: {
    //flex: 1 , 
    //flexDirection: 'row',
    //justifyContent: 'center', 
    alignItems: 'flex-end',
    height: v_AnchoObjeto * 1 ,
    width : DEVICE_WIDTH   
  },
  bgImage_icon : {    
    height: v_AnchoObjeto * 0.7,
    width : v_AnchoObjeto * 0.7   
  },
  vw_NombreCiudad: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    height: v_AnchoObjeto * 1 ,
    width : DEVICE_WIDTH   
  },
  txt_TempActual_Ciudad: {
    color    : v_ColorText,
    fontWeight : 'bold',
    fontSize : v_AnchoObjeto * 0.5
  },
  vw_TempActual: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
    height: v_AnchoObjeto * 3 ,
    width : DEVICE_WIDTH   
  },
  vw_TempActual_Btn_NextPrev: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    width : v_AnchoObjeto * 1  ,
    height: '100%'
  },
  vw_TempActual_Valor: {
    flex: 1 ,
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row'
  },
  txt_TempActual_Valor: {
    color    : v_ColorText,
    fontWeight : 'bold',
    fontSize : v_AnchoObjeto * 1.8
  },
  txt_TempActual_Simbolo: {
    color    : v_ColorText,
    fontWeight : 'bold',
    fontSize : v_AnchoObjeto ,
    marginTop: DEVICE_HEIGHT * -0.1 / 30  ,
    marginLeft: 0
  },
  vw_PronosticoDia: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    height: v_AnchoObjeto * 1.5 ,
    width : DEVICE_WIDTH ,
    flexDirection: 'row' 
  },
  vw_PronosticoDia_cel: {
    flex: 1 , 
    alignItems: 'center',
    justifyContent: 'space-between',
    height: v_AnchoObjeto * 2   
  },
  bgImage_PronosticoDia : {    
    height: v_AnchoObjeto * 0.6,
    width : v_AnchoObjeto * 0.6   
  },
  vw_PronosticoSemana: {
    flex: 1 , 
    flexDirection: 'column',
    justifyContent: 'space-between',
    //alignItems: 'center',
    //height: v_AnchoObjeto * 1 ,
    width : v_PronosticoSemanal_WIDTH   
  },
  vw_PronosticoSemanal_cel: {
    flex: 1 ,     
    flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    height: v_AnchoObjeto * 1.5   ,
    width : v_PronosticoSemanal_WIDTH 
  },
  txt_PronosticoSemanal_dia: {color : v_ColorText , fontWeight : 'bold', fontSize : v_AnchoObjeto * 0.4 },
  txt_PronosticoSemanal_max: {color : v_ColorText , fontWeight : 'bold', fontSize : v_AnchoObjeto * 0.4 },
  txt_PronosticoSemanal_min: {color : v_ColorText ,                      fontSize : v_AnchoObjeto * 0.4 },
}


export default class TiempoActualScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      //data : null , 
      ciudad :null,
      data_resumen : null,
      data_detalle: {} ,
      data_temp_actual : null ,

      xxx : null,
    };
  }

  componentDidMount() {

    AsyncStorage.getItem('@xxx').then((value) => this.setState({ 'xxx': value }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        /* ************************ */
        this.fn_llenar_datos();            
        /* ************************ */
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );

  }

    fn_llenar_datos(){
        //fetch('http://172.25.0.210/rest/?ws=pronostico&c=Lima&f=')
        //fetch('http://172.25.0.210/rest/?ws=pronostico&lon=-77.017130&lat=-12.072269')
        //fetch('http://172.25.0.210/rest/?ws=pronostico&lon='+this.state.longitude+'&lat='+this.state.latitude)
        fetch('http://www.senamhi.gob.pe/sistemas/smartmet/?ws=pronostico&lon='+this.state.longitude+'&lat='+this.state.latitude)
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({
              data: responseJson ,
              ciudad: responseJson.LOCACION.DISTRITO + ' / ' + responseJson.LOCACION.DEPARTAMENTO,
              data_resumen : responseJson.RESUMEN ,
              data_detalle : responseJson.DETALLE , 
              data_temp_actual : responseJson.DETALLE[0].TEMPERATURA,
              data_humedad_actual : responseJson.RESUMEN[0].RH,
              data_t_max_actual : responseJson.RESUMEN[0].T_MAX,
              data_t_min_actual : responseJson.RESUMEN[0].T_MIN,
              data_viento_actual : responseJson.RESUMEN[0].RACHA,
            }, function(){
                
            });

          })
          .catch((error) =>{
            console.error(error);
          });

    }

  render() {
    return (
        <View style={style.conteiner} >
          
        <Image 
        style={style.backgroundImage}
        resizeMode="cover" 
        source={require('../../public/images/fondo.jpg')} 
        />
          <View style={style.conteiner_form} >
                  {/* ***************************************************************************************** */}
                  <View style={[style.border , style.vw_AniadirCiudad]} >

                        {/*
                        <Text>Latitude: {this.state.latitude} / Longitude: {this.state.longitude}</Text>
                        */}
                        <Text>{this.state.xxx}</Text>

                     
                        <Image 
                        style={style.bgImage_icon}
                        resizeMode="contain"  
                        source={require('../../public/images/plus.png')} 
                        /> 
                  </View>
                  {/* ***************************************************************************************** */}
                  <View style={[style.border , style.vw_NombreCiudad]} >
                    <Text style={style.txt_TempActual_Ciudad} > {this.state.ciudad} </Text> 
                  </View>
                  {/* ***************************************************************************************** */}
                  <View style={[style.border , style.vw_TempActual]} >
                      <View style={[style.border,style.vw_TempActual_Btn_NextPrev]}>
                        {/*
                        <Image 
                        style={style.bgImage_icon}
                        resizeMode="contain"  
                        source={require('../../public/images/previous.png')} 
                        /> 
                        */}
                      </View>
                      <View style={[style.border,style.vw_TempActual_Valor]}>
                          
                          <Text style={[style.txt_TempActual_Valor]} > 
                              {this.state.data_temp_actual}°
                           </Text>

                        <Text style={[style.txt_TempActual_Simbolo]}> 
                            C
                        </Text>
                      </View>
                      <View style={[style.border,style.vw_TempActual_Btn_NextPrev]}>
                        {/*
                        <Image 
                        style={style.bgImage_icon}
                        resizeMode="contain"  
                        source={require('../../public/images/next.png')} 
                        />
                        */}
                      </View>
                  </View>
                  {/* ***************************************************************************************** */} 
                  <View style = {style.lineStyle} />      
                  {/* ***************************************************************************************** */}   
                      <View style={[style.border , style.vw_PronosticoDia/*,{ borderTopWidth: 1,borderBottomWidth: 1, borderColor: '#ffffff'  }*/]} >
                          <View style={[style.border,style.vw_PronosticoDia_cel]}>
                            <View style={{flex: 1 ,  justifyContent: 'center', alignItems: 'center'}}>
                                  <Image 
                                  style={style.bgImage_PronosticoDia}
                                  resizeMode="contain"  
                                  source={require('../../public/images/humedad.png')} 
                                  />
                                <Text style={{color : v_ColorText}} >{this.state.data_humedad_actual} %</Text>   
                            </View>
                          </View>
                          <View style={[style.border,style.vw_PronosticoDia_cel]}>
                            <View style={{flex: 1 ,  justifyContent: 'center', alignItems: 'center'}}>
                                    <Image 
                                    style={style.bgImage_PronosticoDia}
                                    resizeMode="contain"  
                                    source={require('../../public/images/temperatura.png')} 
                                    />
                                  <Text style={{color : v_ColorText}} >{this.state.data_t_max_actual}° / {this.state.data_t_min_actual}</Text>   
                            </View>
                          </View>
                          <View style={[style.border,style.vw_PronosticoDia_cel]}>
                              <View style={{flex: 1 ,  justifyContent: 'center', alignItems: 'center'}}>
                                        <Image 
                                        style={style.bgImage_PronosticoDia}
                                        resizeMode="contain"  
                                        source={require('../../public/images/viento.png')} 
                                        />
                                      <Text style={{color : v_ColorText}} > {this.state.data_viento_actual} m/s </Text>   
                              </View>
                          </View>
                      </View>
                  
                  {/* ***************************************************************************************** */}        
                  <View style = {style.lineStyle} /> 
                 {/* ***************************************************************************************** */}
                  <View style={[{flex:1,justifyContent: 'center', alignItems: 'center'}]}>
                        <View style={[style.border , style.vw_PronosticoSemana]} >

                            <FlatList
                              data={this.state.data_resumen}
                              renderItem={({item}) => <View style={[style.border,style.vw_PronosticoSemanal_cel]}>                        
                                                      <View style={[style.border ,style.borderBotton,{width : v_PronosticoSemanal_WIDTH * 0.15 ,  justifyContent: 'center', alignItems: 'center'}]}>
                                                          <Image 
                                                          style={style.bgImage_icon}
                                                          resizeMode="contain"  
                                                          source={require('../../public/images/sol.png')} 
                                                          /> 
                                                      </View>
                                                      <View style={[style.border,style.borderBotton ,{width : v_PronosticoSemanal_WIDTH * 0.45,  justifyContent: 'center' }]}>
                                                        <Text style={style.txt_PronosticoSemanal_dia}>{item.DIA_NOM} {item.DIA}</Text>
                                                      </View>
                                                      <View style={[style.border ,style.borderBotton,{width : v_PronosticoSemanal_WIDTH * 0.20,  justifyContent: 'center', alignItems: 'center'}]}>
                                                        <Text style={style.txt_PronosticoSemanal_max}> {item.T_MAX}° </Text>
                                                      </View>
                                                      <View style={[style.border,style.borderBotton ,{width : v_PronosticoSemanal_WIDTH * 0.20,  justifyContent: 'center', alignItems: 'center'}]}>
                                                        <Text style={style.txt_PronosticoSemanal_min}> {item.T_MIN}°</Text>
                                                      </View>
                                                  </View>   
                                          }

                            />                                                               
                            
                        </View>
                  </View>
                {/* ***************************************************************************************** */}
          </View>
      </View> 
    )
  }
};

 