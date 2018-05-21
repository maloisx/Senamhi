import React, { Component } from 'react';
import { Text,  View ,Image , Dimensions, FlatList  } from 'react-native';
import { Icon , Overlay , Card , Button } from 'react-native-elements'

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
    flex: 1 
  },
  conteiner_form:{
    flex: 1 
  }
}

export default class AvisosScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isLoadingVisible : false ,    
      data : Array(),
    };
   
  }

  _changeStatesLoading(b){
    this.setState({ isLoadingVisible: b});
  }

  componentDidMount() {
      this._CargarAlertas();
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
           
            <FlatList
            data={this.state.data}
            renderItem={({item}) => <Card
                                    title={item.TITULO}
                                    image={{uri: item.IMG}}
                                    //imageStyle={{height:DEVICE_HEIGHT * 0.7,padding: 10}}
                                    >
                                    {/*

                                    <Image
                                      style={{ height:DEVICE_HEIGHT *0.65 , margin : 10}}
                                      resizeMode="contain"
                                      source={{ uri: item.IMG }}
                                    />
*/}
                                    <Text style={{marginBottom: 10}}>
                                      {item.CONTENIDO}
                                    </Text>
                                    <Button
                                      icon={<Icon name='code' color='#ffffff' />}
                                      backgroundColor='#03A9F4'
                                      fontFamily='Lato'
                                      color='#ffffff'
                                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                      title='Ver más' />
                                  </Card>   
                        }

            />

      
      
    </View> 
    )
  }
};

 