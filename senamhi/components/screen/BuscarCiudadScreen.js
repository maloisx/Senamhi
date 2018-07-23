import React, { Component } from 'react';
import { AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert  } from 'react-native';
  import SearchList, { HighlightableText } from '../../../library'
  import Touchable from '../../../library/utils/Touchable'



const { width , height } = Dimensions.get('window')
const DEVICE_HEIGHT = height
const DEVICE_WIDTH = width

const v_AnchoObjeto = DEVICE_HEIGHT / 16;
const v_ColorText = 'white';

const rowHeight = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  emptyDataSource: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  emptySearchResult: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  }
})

export default class BuscarCiudadScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isLoadingVisible : false ,    
      dataSource :[],
    };
   
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

  _changeStatesLoading(b){
    this.setState({ isLoadingVisible: b});
  }

  componentDidMount() {
      this._CargarDatos();
  }

  _CargarDatos(){
    var ws_params = {
      'p_schema': 'appsenamhi',
       'p_pkg': 'PKG.SP_OBT_LIST_CIUDAD_SEARCH',
       'p_param': '[]',
       //'p_param' : '["-13.0803167","-77.0391641"]'
     };             
    this._ws('http://sgd.senamhi.gob.pe/ws/rest/open/ora', ws_params)
    .then(ws_data => {
      //console.log(ws_data.data);

      var data = Array();
      for(var i = 0 ; i < ws_data.data.length ; i++ ){
        var item = {
                    'cod': ws_data.data[i].COD_CIUDAD ,
                    'searchStr': ws_data.data[i].CIUDAD , 
                    'lat': ws_data.data[i].LAT, 
                    'lon': ws_data.data[i].LON 
                  };
        data.push(item);
      }

      this.setState({
        dataSource: data,                
       });
    });
  }

// custom render row
renderRow (item, sectionID, rowID, highlightRowFunc, isSearching) {
  return (
    <Touchable onPress={() => {

      //Alert.alert('SENMAHI', `sectionID: ${sectionID}; item: ${item.searchStr}; lat: ${item.lat} ; lon: ${item.lon} `,
      Alert.alert('SENMAHI', `Cargar los datos de ${item.searchStr} ?`,
        [
          { text: 'OK', onPress: () => {
                                        console.log('OK Pressed');
                                        var nav = this.props.navigation;
                                        nav.navigate("Pronostico del Día",{ lat: item.lat , lon : item.lon  });
                                       }
          },
        ],
        {cancelable: true})

    }}>
      <View key={rowID} style={{flex: 1, marginLeft: 20, height: rowHeight, justifyContent: 'center'}}>
        {/*use `HighlightableText` to highlight the search result*/}
        <HighlightableText
          matcher={item.matcher}
          text={item.searchStr}
          textColor={'#000'}
          hightlightTextColor={'#0069c0'}
        />
      </View>
    </Touchable>
  )
}

// render empty view when datasource is empty
renderEmpty () {
  return (
    <View style={styles.emptyDataSource}>
      <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> Sin Coincidencias </Text>
    </View>
  )
}

// render empty result view when search result is empty
renderEmptyResult (searchStr) {
  return (
    <View style={styles.emptySearchResult}>
      <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Result For <Text
        style={{color: '#171a23', fontSize: 18}}>{searchStr}</Text></Text>
      <Text style={{color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10}}>Please search again</Text>
    </View>
  )
}

  render() {
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#F00' barStyle='light-content' />
          <SearchList
            data={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            renderEmptyResult={this.renderEmptyResult.bind(this)}
            renderBackButton={() => null}
            renderEmpty={this.renderEmpty.bind(this)}

            rowHeight={rowHeight}

            toolbarBackgroundColor={'#2196f3'}
            title='Busca tu ciudad'
            cancelTitle='Limpiar'
            searchInputPlaceholder='Buscar'
            onClickBack={() => {}}

            searchListBackgroundColor={'#2196f3'}

            searchBarToggleDuration={300}

            searchInputBackgroundColor={'#0069c0'}
            searchInputBackgroundColorActive={'#6ec6ff'}
            searchInputPlaceholderColor={'#FFF'}
            searchInputTextColor={'#FFF'}
            searchInputTextColorActive={'#000'}
            searchInputPlaceholder='Search'
            sectionIndexTextColor={'#6ec6ff'}
            searchBarBackgroundColor={'#2196f3'}
          />
        </View>
    )
  }
};

 