import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Prayer } from "../../types/types";
import { processPrayerTime } from '../../services/PrayerTimeProcessor';
import { createEmptyPrayerTimeSummaryMessage, PrayerTimeSummaryMessage } from "../../types/react-types";
import { processPrayerTimeMessage } from '../../services-react/PrayerTimeMessageProcessor';

interface Props {
    prayerTimeMessage: PrayerTimeSummaryMessage
}

export const TodaysDetail: React.FC<Props> = ({prayerTimeMessage}) => {

    return (
        <View style={{ backgroundColor: "#aeaeae" }}>
            <Text>{prayerTimeMessage.prayerName}</Text>
            <Text>{prayerTimeMessage.jamatStatus}</Text>
            <Text>{prayerTimeMessage.nextPrayerStatus}</Text>
            <Text>Jummah Time. Get it from config API</Text>
        </View>
    );
}
