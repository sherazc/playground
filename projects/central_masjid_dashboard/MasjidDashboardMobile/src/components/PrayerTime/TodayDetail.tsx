import React from "react";
import { View, Text } from "react-native";


interface Props {
}

export const TodayDetail: React.FC<Props> = ({ }) => {

    return (
        <View style={{ backgroundColor: "#aeaeae" }}>
            <Text>Current Prayer Name</Text>
            <Text>Time to next Prayer</Text>
            <Text>Jummah Time. Get it from config API</Text>
            <Text>For which prayer time is changing</Text>
        </View>
    );
}
