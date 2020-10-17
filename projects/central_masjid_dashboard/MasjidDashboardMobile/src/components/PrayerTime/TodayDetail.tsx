import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Prayer } from "../../types/types";


interface Props {
    prayer: Prayer
}

export const TodayDetail: React.FC<Props> = ({prayer}) => {

    useEffect(() => {
        if (!prayer || !prayer.date) {
            return;
        }
        console.log("Todays detail initializing.");
        const azanDateTimes = createAza


    }, []);

    return (
        <View style={{ backgroundColor: "#aeaeae" }}>
            <Text>Current Prayer Name</Text>
            <Text>Time to next Prayer</Text>
            <Text>Jummah Time. Get it from config API</Text>
            <Text>For which prayer time is changing</Text>
        </View>
    );
}
