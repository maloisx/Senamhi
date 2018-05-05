import React, { Component } from 'react';
import {StyleSheet, Text,  View , Image , Dimensions } from 'react-native';

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
    borderWidth: 0.2,
    borderColor: '#ffffff'    
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
    flexDirection: 'row',
    justifyContent: 'center', 
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
    fontSize : v_AnchoObjeto * 2.2
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
    height: v_AnchoObjeto * 2 ,
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
    //height: v_AnchoObjeto * 1.5   ,
    width : v_PronosticoSemanal_WIDTH 
  },
  txt_PronosticoSemanal_dia: {color : v_ColorText , fontWeight : 'bold', fontSize : v_AnchoObjeto * 0.4 },
  txt_PronosticoSemanal_max: {color : v_ColorText , fontWeight : 'bold', fontSize : v_AnchoObjeto * 0.4 },
  txt_PronosticoSemanal_min: {color : v_ColorText , fontSize : v_AnchoObjeto * 0.4 },
}


export default class TiempoActualScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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

                  <View style={[style.border , style.vw_AniadirCiudad]} >

                        <Text>Latitude: {this.state.latitude} / Longitude: {this.state.longitude}</Text>
                        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

                        <Image 
                        style={style.bgImage_icon}
                        resizeMode="contain"  
                        source={require('../../public/images/plus.png')} 
                        /> 
                  </View>
              
                  <View style={[style.border , style.vw_NombreCiudad]} >
                    <Text style={style.txt_TempActual_Ciudad} > Nombre Ciudad </Text> 
                  </View>

                  <View style={[style.border , style.vw_TempActual]} >
                      <View style={[style.border,style.vw_TempActual_Btn_NextPrev]}>
                        <Image 
                        style={style.bgImage_icon}
                        resizeMode="contain"  
                        source={require('../../public/images/previous.png')} 
                        /> 
                      </View>
                      <View style={[style.border,style.vw_TempActual_Valor]}>
                        <Text style={[style.txt_TempActual_Valor]}> 
                            29°
                        </Text>
                        <Text style={[style.txt_TempActual_Simbolo]}> 
                            C
                        </Text>
                      </View>
                      <View style={[style.border,style.vw_TempActual_Btn_NextPrev]}>
                        <Image 
                        style={style.bgImage_icon}
                        resizeMode="contain"  
                        source={require('../../public/images/next.png')} 
                        /> 
                      </View>
                  </View>

                  <View style={[style.border , style.vw_PronosticoDia/*,{ borderTopWidth: 1,borderBottomWidth: 1, borderColor: '#ffffff'  }*/]} >
                      <View style={[style.border,style.vw_PronosticoDia_cel]}>
                        <View style={{flex: 1 ,  justifyContent: 'center', alignItems: 'center'}}>
                              <Image 
                              style={style.bgImage_PronosticoDia}
                              resizeMode="contain"  
                              source={require('../../public/images/humedad.png')} 
                              />
                             <Text style={{color : v_ColorText}} >humedad %</Text>   
                        </View>
                      </View>
                      <View style={[style.border,style.vw_PronosticoDia_cel]}>
                        <View style={{flex: 1 ,  justifyContent: 'center', alignItems: 'center'}}>
                                <Image 
                                style={style.bgImage_PronosticoDia}
                                resizeMode="contain"  
                                source={require('../../public/images/temperatura.png')} 
                                />
                              <Text style={{color : v_ColorText}} >max° / min°</Text>   
                        </View>
                      </View>
                      <View style={[style.border,style.vw_PronosticoDia_cel]}>
                          <View style={{flex: 1 ,  justifyContent: 'center', alignItems: 'center'}}>
                                    <Image 
                                    style={style.bgImage_PronosticoDia}
                                    resizeMode="contain"  
                                    source={require('../../public/images/viento.png')} 
                                    />
                                  <Text style={{color : v_ColorText}} > nudos km/h </Text>   
                          </View>
                      </View>
                  </View>
                 
                  <View style={[{flex:1,justifyContent: 'center', alignItems: 'center'}]}>
                        <View style={[style.border , style.vw_PronosticoSemana]} >

                            <View style={[style.border,style.vw_PronosticoSemanal_cel]}>                        
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15 ,  justifyContent: 'center', alignItems: 'center'}]}>
                                      <Image 
                                      style={style.bgImage_icon}
                                      resizeMode="contain"  
                                      source={require('../../public/images/sol.png')} 
                                      /> 
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.55,  justifyContent: 'center' , marginLeft: 10}]}>
                                    <Text style={style.txt_PronosticoSemanal_dia}>Lunes 11</Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_max}> 14° </Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_min}>10 °</Text>
                                  </View>
                            </View> 

                            <View style={[style.border,style.vw_PronosticoSemanal_cel]}>                        
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15 ,  justifyContent: 'center', alignItems: 'center'}]}>
                                      <Image 
                                      style={style.bgImage_icon}
                                      resizeMode="contain"  
                                      source={require('../../public/images/sol.png')} 
                                      /> 
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.55,  justifyContent: 'center' , marginLeft: 10}]}>
                                    <Text style={style.txt_PronosticoSemanal_dia}>Lunes 11</Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_max}> 14° </Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_min}>10 °</Text>
                                  </View>
                            </View>  

                            <View style={[style.border,style.vw_PronosticoSemanal_cel]}>                        
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15 ,  justifyContent: 'center', alignItems: 'center'}]}>
                                      <Image 
                                      style={style.bgImage_icon}
                                      resizeMode="contain"  
                                      source={require('../../public/images/sol.png')} 
                                      /> 
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.55,  justifyContent: 'center' , marginLeft: 10}]}>
                                    <Text style={style.txt_PronosticoSemanal_dia}>Lunes 11</Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_max}> 14° </Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_min}>10 °</Text>
                                  </View>
                            </View>  

                            <View style={[style.border,style.vw_PronosticoSemanal_cel]}>                        
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15 ,  justifyContent: 'center', alignItems: 'center'}]}>
                                      <Image 
                                      style={style.bgImage_icon}
                                      resizeMode="contain"  
                                      source={require('../../public/images/sol.png')} 
                                      /> 
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.55,  justifyContent: 'center' , marginLeft: 10}]}>
                                    <Text style={style.txt_PronosticoSemanal_dia}>Lunes 11</Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_max}> 14° </Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_min}>10 °</Text>
                                  </View>
                            </View>  

                            <View style={[style.border,style.vw_PronosticoSemanal_cel]}>                        
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15 ,  justifyContent: 'center', alignItems: 'center'}]}>
                                      <Image 
                                      style={style.bgImage_icon}
                                      resizeMode="contain"  
                                      source={require('../../public/images/sol.png')} 
                                      /> 
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.55,  justifyContent: 'center' , marginLeft: 10}]}>
                                    <Text style={style.txt_PronosticoSemanal_dia}>Lunes 11</Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_max}> 14° </Text>
                                  </View>
                                  <View style={[style.border ,{width : v_PronosticoSemanal_WIDTH * 0.15,  justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={style.txt_PronosticoSemanal_min}>10 °</Text>
                                  </View>
                            </View>                      
                            
                        </View>
                  </View>
          </View>
      </View> 
    )
  }
};

 