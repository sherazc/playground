import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Prayer, TodaysDetailMessage } from "../../types/types";
import { processPrayerTime } from '../../services/PrayerTimeProcessor';

interface Props {
    prayer: Prayer
}

export const TodaysDetail: React.FC<Props> = ({prayer}) => {
    const [todaysDetailMessage, setTodaysDetailMessage] = useState({
        currentPrayer: "",
        currentJamat: "",
        nextPrayer: ""
    } as TodaysDetailMessage);



    useEffect(() => {
        if (!prayer || !prayer.date) {
            return;
        }

        // TODO: Set TodaysDetailMessage or TodaysDetailTime in state
        processPrayerTime(prayer);

        // TODO: state and process prayer interval and return clear interval method.
        console.log("new Prayer reveived");
    }, [prayer]);

    return (
        <View style={{ backgroundColor: "#aeaeae" }}>
            <Text>Current Prayer: {todaysDetailMessage.currentPrayer}</Text>
            <Text>Current Jammat: {todaysDetailMessage.currentJamat}</Text>
            <Text>Next Prayer: {todaysDetailMessage.nextPrayer}</Text>

            <Text>Jummah Time. Get it from config API</Text>
        </View>
    );
}
