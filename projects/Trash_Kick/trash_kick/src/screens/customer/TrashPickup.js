import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class TrashPickup extends Component {
    state = {
        // latitude: 20.9948891,
        // longitude: 105.799677,
        latitude: 34.075375,
        longitude: -84.294090,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>TrashPickup</Text>
                <MapView
                    style={styles.map}
                    initialRegion={this.state}
                    provider={PROVIDER_GOOGLE}
                    mapType='hybrid'
                    showsUserLocation={true}
                    >
                    <MapView.Marker coordinate={this.state} />
                </MapView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: '#59656C',
        marginBottom: 10,
    },
    map: {
        width: "100%",
        height: "100%",
        flex: 1
    }
};

export default TrashPickup;