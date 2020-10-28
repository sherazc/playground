import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Prayer } from "../../types/types";
import { processPrayerTime } from '../../services/PrayerTimeProcessor';
import { createEmptyPrayerTimeSummaryMessage, PrayerTimeSummaryMessage } from "../../types/react-types";
import { processPrayerTimeMessage } from '../../services-react/PrayerTimeMessageProcessor';

interface Props {
    prayer: Prayer
}

export const TodaysDetail: React.FC<Props> = ({prayer}) => {
    const [prayerTimeMessage, setPrayerTimeMessage] = useState(createEmptyPrayerTimeSummaryMessage());

    let prayerTimeMessageInterval: NodeJS.Timeout;

    useEffect(() => {
        if (!prayer || !prayer.date) {
            return;
        }

        destroyPrayerTimeMessageInterval();

        startPrayerTimeMessageInterval(prayer, setPrayerTimeMessage);
        prayerTimeMessageInterval = setInterval(() => startPrayerTimeMessageInterval(prayer, setPrayerTimeMessage), 1000);

        return destroyPrayerTimeMessageInterval;
    }, [prayer]);

    const destroyPrayerTimeMessageInterval = () => {
        if (prayerTimeMessageInterval) {
            clearInterval(prayerTimeMessageInterval);
        }
    }

    const startPrayerTimeMessageInterval = (prayer: Prayer, setPrayerTimeMessage: React.Dispatch<React.SetStateAction<PrayerTimeSummaryMessage>>) => {
        const prayerTimeSummary = processPrayerTime(prayer);
        const prayerTimeMessage = processPrayerTimeMessage(prayerTimeSummary);
        setPrayerTimeMessage(prayerTimeMessage);
    }

    return (
        <View style={{ backgroundColor: "#aeaeae" }}>
            <Text>{prayerTimeMessage.prayerName}</Text>
            <Text>{prayerTimeMessage.jamatStatus}</Text>
            <Text>{prayerTimeMessage.nextPrayerStatus}</Text>
            <Text>Jummah Time. Get it from config API</Text>
        </View>
    );
}
