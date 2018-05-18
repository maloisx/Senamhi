import React, { Component } from 'react';

import {StyleSheet
  , FlatList 
  , ActivityIndicator 
  , Text
  , View 
  , Image 
  , Dimensions 
  , ListView 
  , AsyncStorage
  , TouchableHighlight 
  , Modal 
  , BackHandler 
 } from 'react-native';
 import { Spinner } from 'nachos-ui'
  import { Icon , Overlay } from 'react-native-elements'

const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

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
    margin: 5,
  },
  textColor:{
    color : v_ColorText, 
  },
  backgroundImage : {
    position: 'absolute',
    top: 0,
    left : 0,
    height: DEVICE_HEIGHT,
    width : DEVICE_WIDTH    
  },
  vw_BuscarCiudad: {
    //flex: 1 , 
    //flexDirection: 'row',
    //justifyContent: 'center', 
    alignItems: 'flex-end',
    height: v_AnchoObjeto * 1.5 ,
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
    width : DEVICE_WIDTH , 
    marginTop: v_AnchoObjeto / 3  ,
    flexDirection: 'row',
  },
  txt_TempActual_Ciudad: {
    color    : v_ColorText,
    fontWeight : 'bold',
    fontSize : v_AnchoObjeto * 0.5
  },
  vw_ciudad_Btn_Lateral: {
    //flex: 1 , 
    //justifyContent: 'center', 
    //alignItems: 'center',
    width : v_AnchoObjeto * 1  ,
    //height: '100%'
  },
  vw_Ciudad_Text: {
    flex: 1 ,
    justifyContent: 'center', 
    alignItems: 'center',
    //height: '100%',
    //flexDirection: 'row'
  },
  vw_TempActual: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
    height: v_AnchoObjeto * 2 ,
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
    height: v_AnchoObjeto * 1,
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
    height: v_AnchoObjeto * 0.5,
    width : v_AnchoObjeto * 0.5   
  },
  vw_PronosticoSemana: {
    flex: 1 , 
    flexDirection: 'column',
    justifyContent: 'space-between',
    //alignItems: 'center',
    //height: v_AnchoObjeto * 1 ,
    //width : v_PronosticoSemanal_WIDTH   
  },
  vw_PronosticoSemanal_cel: {
    flex: 1 ,     
    flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    height: v_AnchoObjeto * 1.5  ,
    //width : v_PronosticoSemanal_WIDTH 
  },
  vw_PronosticoExtendido: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    height: v_AnchoObjeto * 2.2 ,
    width : DEVICE_WIDTH ,
    flexDirection: 'row' 
  },
  vw_PronosticoSemana_row: {
    flex: 1 , 
    flexDirection: 'row',
    margin: 2,
    //justifyContent: 'space-between',
    //alignItems: 'center',
    //height: v_AnchoObjeto * 1 ,
    //width : v_PronosticoSemanal_WIDTH   
  },
  txt_PronosticoSemanal_dia: {color : v_ColorText , fontWeight : 'bold', fontSize : v_AnchoObjeto * 0.4 },
  txt_PronosticoSemanal_max: {color : v_ColorText , fontWeight : 'bold', fontSize : v_AnchoObjeto * 0.4 },
  txt_PronosticoSemanal_min: {color : v_ColorText ,                      fontSize : v_AnchoObjeto * 0.4 },
  
  vw_CarouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vw_CarouselContentContainer: {
    //borderWidth: 2,
    //borderColor: '#CCC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width : DEVICE_WIDTH , 
    height: DEVICE_HEIGHT
  },
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

      icon : null,
      isLoadingVisible : false , 
      isFirstLoad : true,
    };
   
  }

   componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
     this.fn_actualizar_datos();
    }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
  handleBackButton() {      
      return true;
  }

  _changeStatesLoading(b){
    this.setState({ isLoadingVisible: b});
  }

  fn_actualizar_datos(tipo){
      
      if(this.state.isFirstLoad){
        this.setState({ isFirstLoad: false});
        tipo = 'new';
      }

      if(tipo == undefined){
        this._changeStatesLoading(true);
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
              this._changeStatesLoading(false);  
            })
            .catch((error) =>{
              console.error(error);
            });
      }

      if(tipo == 'new'){
        
        this._changeStatesLoading(true);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
            
            //AsyncStorage.setItem("@latitude", this.state.latitude ); 
            //AsyncStorage.setItem("@longitude", this.state.longitude );     
            fetch('http://www.senamhi.gob.pe/sistemas/smartmet/?ws=pronostico&lon='+position.coords.longitude+'&lat='+position.coords.latitude)
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
              this._changeStatesLoading(false);  
            })
            .catch((error) =>{
              console.error(error);
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
        //
      }


/*
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
        });*/


  }

  render() {
    
    return (
       <View style={style.conteiner} >

        <Overlay
          isVisible={this.state.isLoadingVisible}
          windowBackgroundColor="rgba(255, 255, 255, 0.5)"
          overlayBackgroundColor="rgba(36, 97, 153, 0.7)"
          width="auto"
          height="auto"          
          overlayStyle={{justifyContent: 'center',alignItems: 'center' }}
        > 
          <Spinner color="white" />          
          <Text style={{color    : v_ColorText,
                        //fontWeight : 'bold',
                        fontSize : v_AnchoObjeto * 0.3}} >
              Buscando satelites...
          </Text>
        </Overlay>

        <Image 
        style={style.backgroundImage}
        resizeMode="cover" 
        source={require('../../public/images/fondo.jpg')} 
        />
          <View style={style.conteiner_form} >                  
                  {/* ***************************************************************************************** */}
                  <View style={[style.border , style.vw_NombreCiudad]} >
                      <View style={[style.border,style.vw_ciudad_Btn_Lateral]}>
                            <Icon
                            //reverse
                            name='refresh'
                            type='FontAwesome'
                            color='#ffffff'
                            
                            onPress={() => this.fn_actualizar_datos('new')}  />
                      </View>
                      <View style={[style.border,style.vw_Ciudad_Text]}>
                          <Text style={style.txt_TempActual_Ciudad} > 
                            {this.state.ciudad} 
                          </Text>    
                      </View>     
                      <View style={[style.border,style.vw_ciudad_Btn_Lateral]}>
                           <Icon
                            //reverse
                            name='search'
                            type='FontAwesome'
                            color='#ffffff'
                            
                            onPress={() => console.log('hello')}  />
                      </View>            
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
                  <View style={[style.border , style.vw_PronosticoExtendido/*,{ borderTopWidth: 1,borderBottomWidth: 1, borderColor: '#ffffff'  }*/]} >
                    <View style={[style.border , style.vw_PronosticoSemana_row]} >

                        <FlatList
                          data={this.state.data_detalle}
                          renderItem={({item}) => { 
                        
                              return ( 
                                <View style={{flex: 1 
                                           , justifyContent: 'center'
                                           , alignItems: 'center'
                                           , width : 80
                                           , flexDirection: 'column'
                                           }}>
                                    <Text style={style.textColor} >{item.DD}/{item.MM}</Text>
                                    <Text style={style.textColor}>{item.HH}:{item.MI}</Text>
                                    <Image 
                                        style={{height: v_AnchoObjeto *0.7 , width: v_AnchoObjeto *0.7  }}
                                        resizeMode="cover" 
                                        source={images[item.TURNO + parseInt(item.ICON)]} 
                                    />
                                    <Text style={style.textColor}>{item.TEMPERATURA}°</Text>
                                    
                                  </View>
                              )
                          }}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{ height: v_AnchoObjeto * 2, }}
                      />  

                    </View>                        
                  </View>
                  {/* ***************************************************************************************** */}        
                  <View style = {style.lineStyle} /> 
                 {/* ***************************************************************************************** */}
                  <View style={[{flex:1,justifyContent: 'center', alignItems: 'center'}]}>
                   {/*
                   <View style={style.vw_CarouselContainer}>
                        <FlatList
                          data={listViewCarousel}
                          renderItem={({item}) => {
                              return ( 
                                  <View>
                                    {item.view}
                                  </View>
                              )
                          }}
                          horizontal
                          style={{
                            height: DEVICE_HEIGHT,                            
                        }}
                      />
                   </View>
                  */}      

                        {
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
                        }      
                        

                  </View>
                  {/* ***************************************************************************************** */}
                  <View style={[style.border,{width:DEVICE_WIDTH ,justifyContent: 'center', alignItems: 'center'}]} >
                      
                          <Text style={{color:v_ColorText}}> 
                            {this.state.latitude} /  {this.state.longitude}
                          </Text>   
                                  
                  </View>
                {/* ***************************************************************************************** */}
                
          </View>
      </View> 
    )
  }
};

 