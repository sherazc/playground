import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import Main from "./src/Main";


export default class azan_call extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Main/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 20, //space for time on top
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('azan_call', () => azan_call);

/*
<Main />
onLayout(e) {
  const {width, height} = Dimensions.get('window')
  console.log(width, height)
}

render() {
  var style = StyleSheet.create({
    parent: {
        width: '100%',
        height: '100%',

        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    child: {
        width: 100,
        height: '25%', 
        //aspectRatio: 1,
        padding: 10,
        //margin: 10,
    }
  });
  return (
    <View style={[style.parent]} onLayout={this.onLayout.bind(this)}>
      <View style={[style.child, {backgroundColor: '#996666'} ]} />
      <View style={[style.child, {backgroundColor: '#339966'} ]} >
        <Image source={require("./src/ui/images/azan_called.png")}
            style={{width: "100%", height: "100%", resizeMode: "contain"}}/>
      </View>
      <View style={[style.child, {backgroundColor: '#996633'} ]} />
      <View style={[style.child, {backgroundColor: '#669933'} ]} />        
    </View>
  )
*/