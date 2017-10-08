import React, { Component } from 'react';
import SalatTime from "./services/SalatTime";

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

let salatTime = new SalatTime('http://dashboard.masjidhamzah.com/salat_time.php');

export default class Main extends Component {
    componentDidMount() {
        salatTime.reteriveTodaysSchedule();
    }

    render() {
        return (
            <View>
                <Text>Test</Text>
            </View>
        );
    }
}