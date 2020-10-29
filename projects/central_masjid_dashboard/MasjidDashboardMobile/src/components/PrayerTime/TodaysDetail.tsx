import React from "react";
import { View, Text } from "react-native";
import { ConfigurationKey } from "../../services/Constants";
import { findConfigurationByName } from "../../services/Utilities";
import { PrayerTimeSummaryMessage } from "../../types/react-types";
import { CompanyData } from '../../types/types';

interface Props {
    prayerTimeMessage: PrayerTimeSummaryMessage;
    companyData: CompanyData;
}

export const TodaysDetail: React.FC<Props> = ({prayerTimeMessage, companyData}) => {

    return (
        <View style={{ backgroundColor: "#aeaeae" }}>
            <Text>{prayerTimeMessage.prayerName}</Text>
            <Text>{prayerTimeMessage.jamatStatus}</Text>
            <Text>{prayerTimeMessage.nextPrayerStatus}</Text>
            <Text>Jummah Time. {findConfigurationByName(companyData.configurations, ConfigurationKey.JUMAH_PRAYER)}</Text>
        </View>
    );
}
