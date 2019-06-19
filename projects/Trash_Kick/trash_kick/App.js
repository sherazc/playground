import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import DashboardNavigator from './src/screens/customer/DashboardNavigator';

const AppContainer =  createAppContainer(DashboardNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}