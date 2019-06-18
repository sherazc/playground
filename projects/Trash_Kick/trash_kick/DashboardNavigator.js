import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View } from 'native-base';
import TrashPickup from "./src/screens/Dashboard/TrashPickup"
import Booking from './src/screens/Dashboard/Booking';
import Dashboard from './src/screens/Dashboard';

const routes = {
    Dashboard: {
        screen: Dashboard,
    },
    TrashPickup: {
        screen: TrashPickup,
    },
    Details: {
        screen: Booking,
    },
};

const config ={
    initialRouteName: 'Dashboard'
}

export default createStackNavigator(routes, config);
