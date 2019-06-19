import React, {Component} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import CustomerNavigator from './src/screens/customer/CustomerNavigator';
import AuthenticationNavigator from './src/screens/authentication/AuthenticationNavigator';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createSwitchNavigator({
  Authentication: AuthenticationNavigator,
  Customer: CustomerNavigator,
}, {
  initialRouteName: "Authentication"
});

const AppContainer =  createAppContainer(AppNavigator);

