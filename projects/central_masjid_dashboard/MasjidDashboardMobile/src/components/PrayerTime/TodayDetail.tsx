import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Prayer } from "../../types/types";


interface Props {
    prayer: Prayer
}

export const TodayDetail: React.FC<Props> = ({prayer}) => {
    const [statePrayer, setStatePrayer] = useState({} as Prayer);

    useEffect(() => {
        setStatePrayer("")
        if (!prayer || !prayer.date) {
            return;
        }
        console.log("new Prayer reveived");
    }, [prayer]);

    return (
        <View style={{ backgroundColor: "#aeaeae" }}>
            <Text>Current Prayer Name {count}</Text>
            <Text>Time to next Prayer</Text>
            <Text>Jummah Time. Get it from config API</Text>
            <Text>For which prayer time is changing</Text>
            <Button onPress={() => setCount(count + 1)} title="set count"/>
        </View>
    );
}
