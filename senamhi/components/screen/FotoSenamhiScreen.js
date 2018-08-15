import React, { Component } from 'react';
import { AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Image,
  Platform,
  Alert  } from 'react-native';


  import { Icon , Overlay , Card , Button , Badge , Header } from 'react-native-elements'

import ImagePicker from 'react-native-image-picker'
import ViewShot,{  captureRef , captureScreen } from "react-native-view-shot";
import Share, {ShareSheet} from 'react-native-share';

const { width , height } = Dimensions.get('window');
const DEVICE_HEIGHT = height;
const DEVICE_WIDTH = width;

const v_AnchoObjeto = DEVICE_HEIGHT / 16;
const v_ColorText = 'white';

const style = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#efefef',
    //flexDirection: 'column',
    //justifyContent: 'flex-start'
    //justifyContent: 'center', 
    alignItems: 'center',
  }, 
  containerShared : {
    
    flex: 1, 
    position: 'absolute',
    top: 0,
    left : 0,
    //height: DEVICE_HEIGHT ,
    //width : DEVICE_WIDTH  ,   
  }, 
  ContainerImage : {
    borderWidth: 1,

    //position: 'absolute',
    //top: 0,
    //left : 0,
    height: DEVICE_HEIGHT ,
    width : DEVICE_WIDTH  ,   
  },
    ContainerLogo : {
    borderWidth: 1,
    //borderColor: '#efefef',
    //flex: 1,    
    position: 'absolute',
    //op: 0,
    //left : 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: DEVICE_HEIGHT ,
    width : DEVICE_WIDTH  ,  
  },img_logo : {
    //position: 'absolute',
    //top: 0,
    //left : 0,
    height: DEVICE_HEIGHT * 0.55 ,
    width : DEVICE_WIDTH * 0.55   
  },
  ContainerButton : {
    flex: 1,
    flexDirection: 'row',
    //position: 'absolute',
    //top: 0,
    //left : 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: DEVICE_HEIGHT ,
    width : DEVICE_WIDTH  ,     
    marginRight: v_AnchoObjeto,
    marginBottom: v_AnchoObjeto, 
  },
  btn :{
    flexDirection: 'row' ,
    justifyContent: 'center',  
    alignItems: 'center',
    //width : DEVICE_WIDTH ,    
    //marginRight: 25,
   //marginBottom: 5, 
  },
  btn_txt :{
    fontSize:v_AnchoObjeto*0.3 ,
  }

})

export default class FotoSenamhiScreen extends Component {

  constructor(props) {
    super(props);   
    this.state = {
      imagePath: '/storage/emulated/0/Pictures/image-ecd3fc31-a3c4-414e-9efc-f9f8e898b64b.jpg',
      imageHeight: '960',
      imageWidth: '1280'
    };   
  }

  _captureScreenFunction(){
    //captureScreen({
    captureRef(this.refs.ViewCapture,{
        format: "png",
        quality: 0.9,
        result: Platform.OS === 'ios' ? "data-uri" : "tmpfile",
        snapshotContentContainer: false
      })
      .then(      
        uri => {
                console.log(uri);
                var shareOptions = {
                  title: "SENAMHI APP",
                  message: "#YoSoySENAMHI #SENAMHIApp",
                  url: uri,
                  subject: "PRONOSTICO DEL TIEMPO" //  for email
                };
                Share.open(shareOptions);
              },
        error => console.error("Oops, Something Went Wrong", error)
      ); 
      
    }

  openImagePicker(){
    const options = {
        title: 'Seleciona una foto.',
        storageOptions:{
          skipBackup: true,
          path: 'images'
        }
    }

    ImagePicker.showImagePicker(options, (response) => {
        if(response.didCancel){
          console.log('se cancelo el ImagePicker')
        } else if(response.error){
          console.log('error imagePicker: '+response.error)
        } else if(response.customButton){
          console.log('user custom button ImagePicker '+ response.customButton)
        } else{
          console.log(response);
          this.setState({
            imagePath: response.uri,
            imageHeight: response.height,
            imageWidth: response.width
          })
        }
    })

  }

 render(){
   return(
      <View style={style.container} >

        {this.state.imagePath ? 
            <ViewShot ref="ViewCapture" style={style.containerShared}>
                <View style={style.ContainerImage} >
                  <Image 
                    style={{
                            width : (DEVICE_WIDTH  / this.state.imageWidth) * this.state.imageWidth ,
                            height: (DEVICE_HEIGHT  / this.state.imageHeight) * this.state.imageHeight ,                        
                          }}  
                    source={{uri : this.state.imagePath}} 
                  />
              </View>
              <View  style={style.ContainerLogo} >
                  <Image 
                  style={style.img_logo}
                  resizeMode="contain" 
                  source={require('../../public/images/logo-senamhi.png')}             
                />
              </View>
            </ViewShot>
            
          
          : null}

          <View style={style.ContainerButton} >        
              <Icon  
              reverse
                name='photo-camera'
                color='#246199'
                onPress={() =>this.openImagePicker()} /> 
              <Icon  
              reverse
                name='share'
                type='FontAwesome'
                color='#246199'
                onPress={() =>this._captureScreenFunction()} />
          </View>


      </View>
   )
 }

}