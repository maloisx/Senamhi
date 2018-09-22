import React, { Component } from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableHighlight, TextInput} from 'react-native';

const {width, height } = Dimensions.get('window')

const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;

const anchoItem = DEVICE_HEIGHT / 16 ;

const Style = StyleSheet.create({

    containter : {       
        //borderWidth : 0 ,
        flex: 1,
        backgroundColor: 'yellow',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    cssText : {
        borderWidth : 1 ,
        backgroundColor: 'green',
        width: DEVICE_WIDTH,
        height: anchoItem,
        textAlign: 'center',
    },
    cssTextBtn : {
        borderWidth : 1 ,
        backgroundColor: 'red',
        color: 'white',
        width: DEVICE_WIDTH,
        textAlign: 'center',
    }

});

export default class Prueba02 extends Component {

    constructor(props){
        super(props);

        this.state = {
            var_a : '2',
            var_b : '3',
            resultado : '',
            data : Array(),
            data_status : '',
        }

    }

    


    _buscarResultado(){

        var a = this.state.var_a;
        var b = this.state.var_b;

        v_url = 'http://sgd.senamhi.gob.pe/ws/rest/open/ora';
        v_schema = 'sisweb';
        v_pkg = 'pkg_test.sp_suma';   
        v_param = '["'+a+'","'+b+'"]'; 

        var ws_params = {
            'p_schema': v_schema,
            'p_pkg': v_pkg,
            'p_param': v_param,
        }

      var response = Array();
      var formBody = [];
      for (var property in ws_params) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(ws_params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      var RequestRest = { 
                         method : 'post',
                         headers: {'Content-Type' : 'application/x-www-form-urlencoded'},   
                         body : formBody
                        }
      
     fetch(v_url,RequestRest)
     .then( ( response ) => response.json() )
     .then ( (responseJSON) => {

        this.setState({data : responseJSON.data , data_status : responseJSON.request.STATUS});
        
        if ( this.state.data_status == 'OK' ){
            var data = this.state.data;
            this.setState({resultado: data[0].RPTA});
        }else{
            console.log(responseJSON.request.MSG)            
        }

        
     }).catch( (error) => {
         console.log(error);
     } )



     //this.setState({
     //                   resultado : a + b,
     //                 })
    }

    render(){
        return(
            <View style={Style.containter}>


                <Text style={Style.cssText}>Prueba de la gigi</Text>

                <TextInput style={Style.cssText} onChangeText={ (Text) => this.setState({var_a : Text}) } value={this.state.var_a} />
                <TextInput style={Style.cssText} onChangeText={ (Text) => this.setState({var_b : Text}) } value={this.state.var_b} />

                <Text style={Style.cssText}>{this.state.resultado}</Text>
                

                <TouchableHighlight onPress={ () => this._buscarResultado() }>
                    <View>
                        <Text style={Style.cssTextBtn}>
                            buscar resultado
                        </Text>
                    </View>
                </TouchableHighlight>

            </View>
        
        
        )
    }

};