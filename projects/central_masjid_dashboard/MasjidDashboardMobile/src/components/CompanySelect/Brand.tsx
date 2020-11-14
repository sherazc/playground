import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Logo from '../../images/Logo';
import SvgCssLogo from '../../images/SvgCssLogo';
import Underline from '../../images/Underline';
import { Constants, ConstantsStyles } from '../../services/Constants';

interface Props {
}

export const Brand: React.FC<Props> = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MASJID DASHBOARD</Text>
            {/* <SvgCssLogo/> */}
            <Underline fill={ConstantsStyles.color.lines} width={220} />
            <View style={{marginTop: 20}}>
            <Logo width="100" height="100"/>
            </View>
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
        color: ConstantsStyles.text.colorLight,
        letterSpacing: 3,
        marginBottom: 0,
        ...ConstantsStyles.shadowSmallDarkText
    }
});
