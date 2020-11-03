import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Logo from '../../images/Logo';
import SvgCssLogo from '../../images/SvgCssLogo';

interface Props {
}

export const Brand: React.FC<Props> = () => {
    return (
        <View style={styles.container}>
            <Text>Branding</Text>
            {/* <SvgCssLogo/> */}
            <Logo width="200" height="200"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "purple",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
    }
});
