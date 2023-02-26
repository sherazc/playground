import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ConstantsStyles } from '../services/Constants';

interface Props {
}

export const RecoveringFromStorageImage: React.FC<Props> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/splash-screens.png')}
                    resizeMode="center"
                    style={styles.image}>
                    <Text style={styles.text}>Loading...</Text>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ConstantsStyles.color.background2,
        flex: 1,
    },
    loadingText: {
        fontSize: 25,
        color: ConstantsStyles.text.colorLight,
        marginBottom: 100
    },
    image: {
        marginTop: -5,
        justifyContent: "center",
        width: "100%",
        height: '100%'
    },
    text: {
        marginTop: 200,
        color: "white",
        fontSize: 20,
        textAlign: "center",
    }
});
