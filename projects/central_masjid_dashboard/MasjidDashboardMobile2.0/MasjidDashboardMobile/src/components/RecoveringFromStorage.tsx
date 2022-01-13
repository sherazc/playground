import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ConstantsStyles } from '../services/Constants';
import { Brand } from './CompanySelect/Brand';

interface Props {
}

export const RecoveringFromStorage: React.FC<Props> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{height: 300}}>
                <Brand />
            </View>
            <Text style={styles.loadingText}>
                Loading...
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ConstantsStyles.color.background2,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 25,
        color: ConstantsStyles.text.colorLight,
        marginBottom: 100
    }
});
