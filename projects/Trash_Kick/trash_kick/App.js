import React, {Component} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthenticationNavigator from './src/screens/authentication/AuthenticationNavigator';
import AppDrawerNavigator from './src/screens/appDrawer/AppDrawerNavigator';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createSwitchNavigator({
  Authentication: AuthenticationNavigator,
  AppDrawer: AppDrawerNavigator,
}, {
  initialRouteName: "Authentication"
});

const AppContainer =  createAppContainer(AppNavigator);

