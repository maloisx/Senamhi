import React, { Component } from 'react';
import { Text,  View ,Image } from 'react-native';
import { Button , Card , Indicator , Typography} from 'nachos-ui'

const btnStyle = { margin: 15 }
const cardStyle = { margin: 15, width: 280 }
const textStyle = { margin: 15 }
const imageStyle = {
  width: 50,
  height: 50,
  borderRadius: 10,
}
const indicatorStyle = {
  marginRight: 30,
}

const style = {
  conteiner:{
    flex: 1 
  },
  conteiner_form:{
    flex: 1 ,   
    flexDirection: 'column'
  }
}

export default class AvisosScreen extends Component {
  render() {
    return (
      <View style={style.conteiner_form}>
      

      <Indicator
          position='right top'
          value='2'
          type='success'
          style={indicatorStyle}
        >
          <Image
            style={imageStyle}
            source={{
              uri: 'https://d3vv6lp55qjaqc.cloudfront.net/items/130d3E0o0E0I31460H0n/Untitled-1.png',
            }}
          />
        </Indicator>

 <Card
        footerContent='The avocado is a tree that is native to Mexico'
        image='https://upx.cz/BsN'
        style={cardStyle}
      />

      <Button type='success' style={btnStyle}>Success</Button>
      <Button type='danger' style={btnStyle}>Danger</Button>
      <Button style={btnStyle}>Primary</Button>

      <Button kind='squared' type='success' style={btnStyle}>
        Success
      </Button>
      <Button kind='squared' type='danger' style={btnStyle}>
        Danger

      </Button>
      <Button
        kind='squared'
        iconName='md-cloud-download'
        style={btnStyle}
      >
        Primary
      </Button>

      <Button type='success' disabled style={btnStyle}>
        Success
      </Button>
      <Button kind='squared' type='danger' disabled style={btnStyle}>
        Danger
      </Button>
    </View> 
    )
  }
};

 