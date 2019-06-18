import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TrashPickup from "./src/screens/Dashboard/TrashPickup"
import Booking from './src/screens/Dashboard/Booking';
import Dashboard from './src/screens/Dashboard';

const DashboardNavigator = createStackNavigator(
    {
        Dashboard: {
            screen: Dashboard,
        },
        TrashPickup: {
            screen: TrashPickup,
        },
        Details: {
            screen: Booking,
        },
    },
    {
        initialRouteName: 'Dashboard',
    }
);

export default DashboardNavigator;

/*

class DashboardNavigator extends Component {

    render() {
        return(
            <View>
                <Text>DashboardNavigator</Text>
            </View>
        );
    }
}

export default DashboardNavigator;
*/