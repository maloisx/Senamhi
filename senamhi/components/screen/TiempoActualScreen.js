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
  , Platform
 } from 'react-native';
  import { Spinner , H1  } from 'nachos-ui'
  import { Icon , Overlay } from 'react-native-elements'  
  import { material , systemWeights } from 'react-native-typography'
  import { captureRef , captureScreen } from "react-native-view-shot";
  import Share, {ShareSheet, Button} from 'react-native-share';


const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

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
    height: v_AnchoObjeto * 1.2,
    width : v_AnchoObjeto * 1.2   
  },
  vw_NombreCiudad: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    height: v_AnchoObjeto * 0.8 ,
    width : DEVICE_WIDTH , 
    marginTop: v_AnchoObjeto / 4  ,
    flexDirection: 'row',
  },
  vw_Fecha: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    height: v_AnchoObjeto * 0.7 ,
    width : DEVICE_WIDTH , 
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
    height: v_AnchoObjeto * 3.5 ,
    marginTop: v_AnchoObjeto / 4  ,
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
  /*txt_TempActual_Valor: {
    color    : v_ColorText,
    fontWeight : '100',
    fontSize : v_AnchoObjeto * 3.8,    
    letterSpacing: -10,
  },*/
  txt_TempActual_Valor: [
    material.display4White , systemWeights.thin , {color : v_ColorText , letterSpacing: -10,}
  ],
  txt_TempActual_Text: [{
    color : v_ColorText,
    textAlign: 'center',
  }],
  txt_TempActual_Simbolo: [
    material.display2White , 
    systemWeights.bold , 
      { 
        color : v_ColorText , 
        //letterSpacing: -10,
        //fontSize : v_AnchoObjeto ,
        marginTop: DEVICE_HEIGHT * -0.1 / 30  ,
        marginLeft: 0
      }
    
  ],
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
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    height: v_AnchoObjeto * 1  ,
    //width : v_PronosticoSemanal_WIDTH 
  },
  vw_PronosticoExtendido: {
    //flex: 1 , 
    justifyContent: 'center', 
    alignItems: 'center',
    height: v_AnchoObjeto * 1.8 ,
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
     
    console.log(props);
    
    var busqueda_lat = props.navigation.getParam('lat','');
    var busqueda_lon = props.navigation.getParam('lon','');
    console.log('busqueda_lat' + busqueda_lat );
    console.log('busqueda_lon' + busqueda_lon );
    

    this.state = {
      latitude: busqueda_lat,
      longitude: busqueda_lon,
      error: '',
      data : Array() , 
      ciudad :'',
      data_resumen : '',
      txt_fecha : '',
      data_detalle: Array() ,

      data_temp_actual : '',
      data_txt_pronostico : '',

      icon : '',
      isLoadingVisible :false , 
      isFirstLoad :  ((busqueda_lat+busqueda_lon == '')?true:false),

      imageURI : 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg', 

    };
   
  }

  _captureScreenFunction(){
 
    captureScreen({
    //  captureRef("view_body",{
      format: "jpg",
      quality: 0.8
    })
    .then(      
      uri => {
              console.log(uri);
              var shareOptions = {
                title: "SENAMHI APP",
                message: "Pronostico del tiempo desde el SENAMHI APP.",
                url: uri,
                subject: "PRONOSTICO DEL TIEMPO" //  for email
              };
              Share.open(shareOptions);
            },
      error => console.error("Oops, Something Went Wrong", error)
    ); 
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

  _CargarDatos = () => {

    console.log("-- "+this.state.latitude+' / '+this.state.longitude);

    /* WS PARA UBICACION ******************************************************************************* */
    var ws_params = {
      'p_schema': 'appsenamhi',
       'p_pkg': 'PKG.SP_OBT_UBIC',
       'p_param': '["'+this.state.latitude+'","'+this.state.longitude+'"]',
       //'p_param' : '["-13.0803167","-77.0391641"]'
     };   
     this._changeStatesLoading(true);          
    this._ws('http://sgd.senamhi.gob.pe/ws/rest/open/ora', ws_params)
    .then(ws_data => {
      data= ws_data.data[0];
      console.log(data);
      this.setState({
         ciudad: data.NOM_DEP + ' / ' + data.NOM_DIST,                
       });
       this._changeStatesLoading(false);
    });
    /* /.WS PARA UBICACION ******************************************************************************* */
    /* WS PARA RESUMEN *********************************************************************************** */
    var ws_params = {
     'p_schema': 'appsenamhi',
      'p_pkg': 'PKG.SP_OBT_PRONOS_RESUMEN',
      'p_param': '["'+this.state.latitude+'","'+this.state.longitude+'"]',
      //'p_param' : '["-13.0803167","-77.0391641"]'
    }; 
    this._changeStatesLoading(true);            
   this._ws('http://sgd.senamhi.gob.pe/ws/rest/open/ora', ws_params)
   .then(ws_data => {
     data= ws_data.data;
     console.log(data);
     this.setState({
       data_resumen : data,
       txt_fecha : data[0].HOY,      
       data_t_max_actual : data[0].TEMP_MAX,
       data_t_min_actual : data[0].TEMP_MIN,       
       data_txt_pronostico: data[0].DES_PRON, 
       data_temp_actual : data[0].TEMP_MIN

      });
      this._changeStatesLoading(false);
   });
   /* /.WS PARA RESUMEN *********************************************************************************** */
   /* WS PARA DETALLE *********************************************************************************** */
   var ws_params = {
     'p_schema': 'appsenamhi',
      'p_pkg': 'PKG.SP_OBT_PRONOS_DETALLE',
      'p_param': '["'+this.state.latitude+'","'+this.state.longitude+'"]',
      //'p_param' : '["-13.0803167","-77.0391641"]'
    };
   this._changeStatesLoading(true);             
   this._ws('http://sgd.senamhi.gob.pe/ws/rest/open/ora', ws_params)
   .then(ws_data => {
     data= ws_data.data;
     console.log(data);

     var v_data_temp_actual = '';
     var v_data_humedad_actual = '';
     var v_data_viento_actual = '';

     var t_min = this.state.data_t_max_actual;
     var t_max = this.state.data_t_min_actual;


     for(var i = 0 ; i < data.length ; i++ ){
      if(data[i].ACT == '1'){
          //v_data_temp_actual = data[i].TEMP;
          v_data_humedad_actual = data[i].HUM;
          v_data_viento_actual = data[i].VIE;  
          break;
      }       
     }

     this.setState({
       data_detalle : data ,
       //data_temp_actual : v_data_temp_actual,
       data_humedad_actual : v_data_humedad_actual,
       data_viento_actual : v_data_viento_actual,
      });

      this._changeStatesLoading(false);

   });
   /* /.WS PARA DETALLE *********************************************************************************** */
    
    
  }

  fn_actualizar_datos(tipo){
      //console.log("tipo: "+tipo)
      if(this.state.isFirstLoad){
        this.setState({ isFirstLoad: false});
        tipo = 'new';        
      }else{
        tipo = 'list_buscar';
      }

      if(tipo == undefined || tipo == 'list_buscar'){
        this._changeStatesLoading(true);
        this._CargarDatos();        
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
            
           this._CargarDatos();

           this._changeStatesLoading(false);


          },
          (error) =>{   
                      console.log(error.message);
                      this.setState({ error: error.message } )   
                    },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
        
      }
  }

  render() {
    
    return (
       <View style={style.conteiner}  ref="view_body"  >

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
                            onPress={() => {
                                            //console.log('hello')
                                            var nav = this.props.navigation;
                                            nav.navigate("Buscar Ciudad",{ lat: '' , lon : ''  });
                                           }
                                    }  
                            />
                      </View>            
                  </View>
                  {/* ***************************************************************************************** */}
                  {/* ***************************************************************************************** */}
                  <View style={[style.border , style.vw_Fecha]} >
                      <View style={[style.border,style.vw_Ciudad_Text]}>
                          <Text style={style.txt_TempActual_Ciudad} > 
                            {this.state.txt_fecha} 
                          </Text>    
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

                          <View style={{flexDirection:'column'}}>
                             
                              <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center',flex:1}}>
                                  <Text style={style.txt_TempActual_Valor} > 
                                      {Math.round(this.state.data_temp_actual)}°
                                  </Text>
                                  <Text style={[style.txt_TempActual_Simbolo]}> 
                                      C
                                  </Text>
                              </View>

                              <View style={[style.border,{justifyContent: 'center', alignItems: 'center'}]}>
                                  <Text style={[style.txt_TempActual_Text]}>  
                                      {this.state.data_txt_pronostico}
                                  </Text>
                              </View>

                          </View>
                          

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
                          keyExtractor={item => item.DD + '_' + item.HH}
                          renderItem={({item,index}) => {                         
                              return ( 
                                <View style={{flex: 1 
                                           , justifyContent: 'center'
                                           , alignItems: 'center'
                                           , width : 80
                                           , flexDirection: 'column'
                                           }}>
                                    {/*        
                                    <Text style={style.textColor} >{item.DD}/{item.MM}</Text>
                                    */}
                                    <Text style={style.textColor}>{item.HH}:{item.MI}</Text>
                                    <Image 
                                        style={{height: v_AnchoObjeto * 1 , width: v_AnchoObjeto * 1  }}
                                        resizeMode="cover" 
                                        source={images[item.ICON]} 
                                    />
                                    <Text style={style.textColor}>{parseInt(item.TEMP)}°</Text>
                                    
                                  </View>
                              )
                          }}                          
                          horizontal={true}
                          style={{ height: v_AnchoObjeto * 2, }}
                          showsHorizontalScrollIndicator={false}
                      />  

                    </View>                        
                  </View>
                  {/* ***************************************************************************************** */}        
                  <View style = {style.lineStyle} /> 
                 {/* ***************************************************************************************** */}
                  <View style={[{flex:1,justifyContent: 'center', alignItems: 'center'}]}>
                          {
                        <View style={[style.border , style.vw_PronosticoSemana]} >
                          <FlatList
                            data={this.state.data_resumen}
                            keyExtractor={item => item.FECHA}
                            renderItem={({item}) => <View style={[style.border,style.vw_PronosticoSemanal_cel,{flexDirection: 'column'}]}> 
                                                      <View style={{flexDirection: 'row'}}>
                                                          <View style={[style.border ,style.borderBotton,{width : v_PronosticoSemanal_WIDTH * 0.15 ,  justifyContent: 'center', alignItems: 'center'}]}>
                                                              <Image 
                                                              style={style.bgImage_icon}
                                                              resizeMode="contain"  
                                                              source={images[item.ICON]} 
                                                              /> 
                                                          </View>
                                                          <View style={[style.border,style.borderBotton ,{width : v_PronosticoSemanal_WIDTH * 0.45,  justifyContent: 'center' }]}>
                                                            <Text style={style.txt_PronosticoSemanal_dia}>{item.NOM_DIA} {item.DD}</Text>
                                                          </View>
                                                          <View style={[style.border ,style.borderBotton,{width : v_PronosticoSemanal_WIDTH * 0.20,  justifyContent: 'center', alignItems: 'center'}]}>
                                                            <Text style={style.txt_PronosticoSemanal_max}> {item.TEMP_MAX}° </Text>
                                                          </View>
                                                          <View style={[style.border,style.borderBotton ,{width : v_PronosticoSemanal_WIDTH * 0.20,  justifyContent: 'center', alignItems: 'center'}]}>
                                                            <Text style={style.txt_PronosticoSemanal_min}> {item.TEMP_MIN}°</Text>
                                                          </View>
                                                      </View>
                                                      {/*
                                                      <View style={[style.border,{width : v_PronosticoSemanal_WIDTH ,  justifyContent: 'center', alignItems: 'center'}]}>
                                                          <Text style={style.txt_PronosticoSemanal_min} > {item.DES_PRON}</Text>
                                                      </View>
                                                      */}

                                                    </View>   
                                        }

                          />
                          </View>
                        }      
                        

                  </View>
                  {/* ***************************************************************************************** */}
                  {/*
                  <View style={[style.border,{width:DEVICE_WIDTH ,justifyContent: 'flex-end', alignItems: 'flex-end'}]} >

                          <Icon
                            reverse
                            name='share'
                            type='FontAwesome'
                            color='#246199'                            
                            onPress={() => {
                                            console.log('captura de pantalla x!');
                                            this._captureScreenFunction();                                            
                                            //var nav = this.props.navigation;
                                            //nav.navigate("Buscar Ciudad",{ lat: '' , lon : ''  });
                                           }
                                    }  
                            />

                          {
                          //<Text style={{color:v_ColorText}}> 
                          //  {this.state.latitude} /  {this.state.longitude}
                          //</Text>   
                          }                                    
                  </View>
                  */}            
                {/* ***************************************************************************************** */}
                
          </View>
      </View> 
    )
  }
};

 