import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import DashboardNavigator from './DashboardNavigator';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <DashboardNavigator/>;
  }
}

export default App;