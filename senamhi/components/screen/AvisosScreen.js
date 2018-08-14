import React, { Component } from 'react';
import { Text,  View ,Image , Dimensions, FlatList , TouchableHighlight , Alert } from 'react-native';
import { Icon , Overlay , Card , Button , Badge , Header } from 'react-native-elements'
import Carousel from 'react-native-carousel-view';
import {Bubble} from 'nachos-ui'

const HeaderTitle = 'ALERTAS';

const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const v_AnchoObjeto = DEVICE_HEIGHT / 16;
const v_ColorText = 'white';

const btnStyle = { margin: 15 }
const cardStyle = { margin: 15, width: 280 }
const textStyle = { margin: 15 }

const style = {
  conteiner:{
    //flex: 1 ,    
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    borderWidth: 0,
    borderColor: '#CCC',
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    //width:DEVICE_WIDTH *0.5 ,
    
  },
  Aviso_contenido_row:{ 
    height:v_AnchoObjeto *0.6, 
    flexDirection:'row',
    alignItems: 'center', 
    marginBottom:5,
  },
  Aviso_contenido_txt_subtitle:{ 
    width: 130  ,
    fontWeight : 'bold',
  },
  Aviso_contenido:{

  },

}

const nivelesAlertas = { 
  '01': {
         colorFondo : 'white',
         colorLetra : 'black',
         msj : 'No es necesario tomar precauciones'
  },
  '02': {
    colorFondo : 'yellow',
    colorLetra : 'black',
    msj : 'Sea prudente si realiza actividades al aire libre que puedan acarrear riesgos en caso de mal tiempo, pueden ocurrir fenómenos meteorológicos peligrosos que sin embargo son normales en esta región.  Manténgase al corriente del desarrollo de la situación meteorológica.'
  },
  '03': {
    colorFondo : 'orange',
    colorLetra : 'white',
    msj : 'Se predice fenomenos meteorológicos peligrosos. Manténgase al corriente del desarrollo de la situación y cumpla los consejos e instrucciones dados por als autoridades.'
  },
  '04': {
    colorFondo : 'red',
    colorLetra : 'white',
    msj : 'Sea extremadamente precavido; se predicen ...'
  },
}

export default class AvisosScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isLoadingVisible : false ,    
      data : Array(),
      onLoadingComplete: false,
    };
   
  }

  _changeStatesLoading(b){
    this.setState({ isLoadingVisible: b});
  }

  _changeOnLoadingComplete(b){
    this.setState({ onLoadingComplete: b});
  }

  componentDidMount() {
      this._CargarAlertas();
      this._changeOnLoadingComplete(true);
  }

  _onPressHelpNivel(Nivel){
    if(this.state.onLoadingComplete){
       Alert.alert(
        'Nivel ' + Nivel,
        nivelesAlertas[Nivel].msj
      )
    }
   

  }

  _CargarAlertas(){

        
    var dataRest = {
      'p_schema': 'SISWEB',
      'p_pkg': 'pkg_ws.sp_obt_alertas',
      'p_param': ''
      };

      const URLSearchParams = Object.keys(dataRest).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(dataRest[key]);
        }).join('&');

    var RequestRest = {
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                            },
                    body: URLSearchParams
                  };
    
    this._changeStatesLoading(true);
    fetch('http://sgd.senamhi.gob.pe/ws/rest/open/ora/' , RequestRest )
    //fetch('http://172.25.13.1:8085/ws/rest/open/ora/' , RequestRest )
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              this.setState({
                data: responseJson.data ,                
              }, function(){
                  
              });
              this._changeStatesLoading(false);  
            })
            .catch((error) =>{
              console.error(error);
            });

  }

  render() {
    return (

      

      <View style={style.conteiner_form}>
           {/*
           <Header
            leftComponent={{}}
            centerComponent={{ text: HeaderTitle , style: { fontWeight:'bold' , color: '#fff' } }}
            rightComponent={{ }}
          />*/}

            <FlatList
            data={this.state.data}
            keyExtractor={item => item.COD_ALERTA + '_' + item.TITULO}
            renderItem={({item}) => <Card
                                    title={ "Aviso N° " + item.COD_ALERTA+': ' +item.TITULO}
                                    >
                                     
                                        <Badge  onPress={() => this._onPressHelpNivel(item.NIVEL)}
                                        containerStyle={{ backgroundColor: nivelesAlertas[item.NIVEL].colorFondo , marginBottom : 5}}>
                                          <View style={{ flexDirection: 'row' , justifyContent: 'center',  alignItems: 'center', }}>
                                            <Icon name='sms-failed' />
                                            <Text style={{color:nivelesAlertas[item.NIVEL].colorLetra}}>
                                              Nivel {item.NIVEL}                                             
                                            </Text>                                            
                                          </View>
                                        </Badge>

                                      <Carousel
                                      width={DEVICE_WIDTH *0.85 }
                                      height={DEVICE_HEIGHT *0.55}
                                      animate={false}
                                      indicatorAtBottom={true}
                                      indicatorSize={15}
                                      //indicatorText="•"
                                      inactiveIndicatorText='•'
                                      indicatorColor="#246199"
                                      >
                                      <View style={[style.contentContainer,
                                                   { 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center',
                                                   }
                                                  ]}>                                                                     
                                          <Image
                                            style={{
                                                    height: DEVICE_HEIGHT*0.60,
                                                    width : DEVICE_WIDTH *0.60  }}
                                            resizeMode="center"
                                            source={{ uri: item.IMG }}
                                          />
                                      </View>
                                      <View style={style.contentContainer}>
                                          
                                          <View style={style.Aviso_contenido_row}>
                                            <Text style={style.Aviso_contenido_txt_subtitle}>Inicio del evento: </Text>
                                            <Text >{item.FECHA_INI}</Text>
                                          </View>
                                          
                                          <View style={style.Aviso_contenido_row}>
                                            <Text style={style.Aviso_contenido_txt_subtitle}>Fin del evento: </Text>
                                            <Text >{item.FECHA_FIN}</Text>
                                          </View>

                                          <View style={style.Aviso_contenido_row}>
                                            <Text style={style.Aviso_contenido_txt_subtitle}>Aviso: </Text>
                                            <Text></Text>
                                          </View>                                              
                                          <Text style={{ textAlign:'center'}}>
                                            {item.CONTENIDO}
                                          </Text>

                                      </View>
                                    </Carousel>
                                   
                                    
                                  </Card>   
                        }

            />

      
      
    </View> 
    )
  }
};

 