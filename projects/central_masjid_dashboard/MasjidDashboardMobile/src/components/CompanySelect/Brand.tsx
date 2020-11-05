import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Logo from '../../images/Logo';
import SvgCssLogo from '../../images/SvgCssLogo';
import { Constants, ConstantsStyles } from '../../services/Constants';

interface Props {
}

export const Brand: React.FC<Props> = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MASJID DASHBOARD</Text>
            {/* <SvgCssLogo/> */}
            <Logo width="100" height="100"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        elevation: 10
    },
    content: {
    },
    title: {
        fontSize: 25,
        color: "#fff",
        letterSpacing: 3,
        marginBottom: 20,
        ...ConstantsStyles.shadowSmallDarkText
    }
});
