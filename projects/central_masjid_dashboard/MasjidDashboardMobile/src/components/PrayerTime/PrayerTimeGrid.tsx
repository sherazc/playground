import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { dateToDisplayDateShort, time24To12 } from '../../services/DateService';
import { Prayer, PrayerTimeSummary, CompanyData } from '../../types/types';
import { PrayerTimeSummaryMessage } from '../../types/react-types';
import { findConfigurationByName } from '../../services/Utilities';
import { ConfigurationKey } from '../../services/Constants';

interface Props {
    prayer: Prayer;
    prayerTimeMessage: PrayerTimeSummaryMessage;
    companyData: CompanyData;
}

export const PrayerTimeGrid: React.FC<Props> = ({companyData, prayer, prayerTimeMessage }) => {
    return (
        <View style={styles.mainBox}>
            <View style={{ ...styles.row, ...styles.rowHeading }}>
                <View style={{ ...styles.cell, ...styles.column1 }}></View>
                <View style={{ ...styles.cell, ...styles.column2 }}>
                    <Text style={{ ...styles.prayerAzanHeading, }}>Azan</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column3 }}>
                    <Text style={{ ...styles.prayerIqamaHeading, }}>Iqama</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column4 }}>
                    <Text style={{ ...styles.prayerNextChangeHeading, }}>Next Change</Text>
                </View>
            </View>


            <View style={{
                ...styles.row,
                ...getActiveOrInActiveStyle(1, prayerTimeMessage.prayerTimeSummary, styles.rowActive, styles.rowInactive)
            }}>
                <View style={{ ...styles.cell, ...styles.column1 }}>
                    <Text style={{ ...styles.prayerName }}>Fajr</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column2 }}>
                    <Text style={{ ...styles.prayerAzan, }}>{time24To12(prayer.fajr)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column3 }}>
                    <Text style={{ ...styles.prayerIqama, }}>{time24To12(prayer.fajrIqama)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column4 }}>
                    <Text style={{ ...styles.prayerNextChange, }}>{dateToDisplayDateShort(prayer.fajrChangeDate)}</Text>
                    <Text style={{ ...styles.prayerNextChange, }}>{time24To12(prayer.fajrChange)}</Text>
                </View>
            </View>

            <View style={{
                ...styles.row,
                ...getActiveOrInActiveStyle(2, prayerTimeMessage.prayerTimeSummary, styles.rowActive, styles.rowInactive)
            }}>
                <View style={{ ...styles.cell, ...styles.column1 }}>
                    <Text style={{ ...styles.prayerName, }}>Zuhr</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column2 }}>
                    <Text style={{ ...styles.prayerAzan, }}>{time24To12(prayer.dhuhr)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column3 }}>
                    <Text style={{ ...styles.prayerIqama, }}>{time24To12(prayer.dhuhrIqama)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column4 }}>
                    <Text style={{ ...styles.prayerNextChange, }}>{dateToDisplayDateShort(prayer.dhuhrChangeDate)}</Text>
                    <Text style={{ ...styles.prayerNextChange, }}>{time24To12(prayer.dhuhrChange)}</Text>
                </View>
            </View>

            <View style={{
                ...styles.row,
                ...getActiveOrInActiveStyle(3, prayerTimeMessage.prayerTimeSummary, styles.rowActive, styles.rowInactive)
            }}>
                <View style={{ ...styles.cell, ...styles.column1 }}>
                    <Text style={{ ...styles.prayerName, }}>Asr</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column2 }}>
                    <Text style={{ ...styles.prayerAzan, }}>{time24To12(prayer.asr)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column3 }}>
                    <Text style={{ ...styles.prayerIqama, }}>{time24To12(prayer.asrIqama)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column4 }}>
                    <Text style={{ ...styles.prayerNextChange, }}>{dateToDisplayDateShort(prayer.asrChangeDate)}</Text>
                    <Text style={{ ...styles.prayerNextChange, }}>{time24To12(prayer.asrChange)}</Text>
                </View>
            </View>

            <View style={{
                ...styles.row,
                ...getActiveOrInActiveStyle(4, prayerTimeMessage.prayerTimeSummary, styles.rowActive, styles.rowInactive)
            }}>
                <View style={{ ...styles.cell, ...styles.column1 }}>
                    <Text style={{ ...styles.prayerName, }}>Maghrib</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column2 }}>
                    <Text style={{ ...styles.prayerAzan, }}>{time24To12(prayer.maghrib)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column3, flex: 3.2 }}>
                    <Text style={{ ...styles.prayerIqama, fontSize: 12}}>
                        {findConfigurationByName(companyData.configurations, ConfigurationKey.MAGHRIB_IQAMA)}
                    </Text>
                </View>
            </View>

            <View style={{
                ...styles.row,
                ...getActiveOrInActiveStyle(5, prayerTimeMessage.prayerTimeSummary, styles.rowActive, styles.rowInactive),
                borderBottomLeftRadius: 5, borderBottomRightRadius: 5
            }}>
                <View style={{ ...styles.cell, ...styles.column1 }}>
                    <Text style={{ ...styles.prayerName, }}>Isha</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column2 }}>
                    <Text style={{ ...styles.prayerAzan, }}>{time24To12(prayer.isha)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column3 }}>
                    <Text style={{ ...styles.prayerIqama, }}>{time24To12(prayer.ishaIqama)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.column4 }}>
                    <Text style={{ ...styles.prayerNextChange, }}>{dateToDisplayDateShort(prayer.ishaChangeDate)}</Text>
                    <Text style={{ ...styles.prayerNextChange, }}>{time24To12(prayer.ishaChange)}</Text>
                </View>
            </View>


        </View>
    );
}

const primaryColor = "#0c274bd5";
const borderColor =   primaryColor;// "#4d6485"

const styles = StyleSheet.create({
    mainBox: {
        borderStyle: "solid",
        borderWidth: .5,
        borderColor: borderColor,
        borderRadius: 5,
        padding: 0,
        margin: 10
    },
    row: { flexDirection: "row", flexWrap: "nowrap", borderWidth: .5, borderColor: borderColor, },
    cell: { justifyContent: "center", padding: 10, flex: 1, alignSelf: "stretch", height: 50 },
    column1: { flex: 1.2 },
    column2: { flex: 1.8 },
    column3: { flex: 1.8 },
    column4: {},
    rowHeading: { backgroundColor: primaryColor, color: "white", borderTopLeftRadius: 5, borderTopRightRadius: 5 },
    rowInactive: { backgroundColor: "#fefefe" },
    rowActive: { backgroundColor: "#d1e9f6" },
    prayerName: { fontSize: 12, color: primaryColor, fontWeight: "bold" },
    prayerAzan: { fontSize: 15 },
    prayerIqama: { fontSize: 15 },
    prayerNextChange: { fontSize: 10, textAlign: "center" },
    prayerAzanHeading: { fontSize: 15, color: "white", fontWeight: "bold" },
    prayerIqamaHeading: { fontSize: 15, color: "white", fontWeight: "bold" },
    prayerNextChangeHeading: { color: "white", fontSize: 10, textAlign: "center", fontWeight: "bold" }
});

const getActiveOrInActiveStyle = (prayerNumber: number,
    prayerTimeSummay: (PrayerTimeSummary | undefined),
    activeStyle: object, inactiveStyle: object) => {

    let result = inactiveStyle;
    if (prayerTimeSummay && prayerTimeSummay.currentPrayerNumber != undefined
        && prayerTimeSummay.currentPrayerNumber === prayerNumber) {
        result = activeStyle;
    }
    return result;
}