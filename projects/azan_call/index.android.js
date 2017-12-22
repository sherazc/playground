import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
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
    flex: 1,
      backgroundColor: '#000000',
  },
});

AppRegistry.registerComponent('azan_call', () => azan_call);
