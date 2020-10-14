import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dateToDisplayDateShort, time24To12 } from '../services/DateService';
import { Prayer } from '../types/types';

interface Props {
    prayer: Prayer;
}

export const PrayerTimeGrid: React.FC<Props> = ({ prayer }) => {
    return (
        <View>
            <View style={{...styles.row, ...styles.rowHeading}}>
                <Text style={{...styles.column1, ...styles.cell}}></Text>
                <Text style={{...styles.column2, ...styles.cell}}>
                    Azan
                </Text>
                <Text style={{...styles.column3, ...styles.cell}}>
                    Iqama
                </Text>
                <Text style={{...styles.column4, ...styles.cell}}>
                    Next Change
                </Text>
            </View>

            <View style={{...styles.row, ...styles.rowInactive}}>
                <Text style={{...styles.prayerName, ...styles.cell, ...styles.column1}}>
                    Fajr
                </Text>
                <Text style={{...styles.prayerAzan, ...styles.cell, ...styles.column2}}>
                    {time24To12(prayer.fajr)}
                </Text>
                <Text style={{...styles.prayerIqama, ...styles.cell, ...styles.column3}}>
                    {time24To12(prayer.fajrIqama)}
                </Text>
                <View style={{...styles.prayerNextChange, ...styles.cell, ...styles.column4}}>
                    <Text>{dateToDisplayDateShort(prayer.fajrChangeDate)}</Text>
                    <Text>{time24To12(prayer.fajrChange)}</Text>
                </View>
            </View>


            <View style={{...styles.row, ...styles.rowInactive}}>
                <Text style={{...styles.prayerName, ...styles.cell, ...styles.column1}}>
                    Shurooq
                </Text>
                <Text style={{...styles.prayerAzan, ...styles.cell, ...styles.column2}}>
                    {time24To12(prayer.sunrise)}
                </Text>
            </View>


            <View style={{...styles.row, ...styles.rowActive}}>
                <Text style={{...styles.prayerName, ...styles.cell, ...styles.column1}}>
                    Zuhr
                </Text>
                <Text style={{...styles.prayerAzan, ...styles.cell, ...styles.column2}}>
                    {time24To12(prayer.dhuhr)}
                </Text>
                <Text style={{...styles.prayerIqama, ...styles.cell, ...styles.column3}}>
                    {time24To12(prayer.dhuhrIqama)}
                </Text>
                <View style={{...styles.prayerNextChange, ...styles.cell, ...styles.column4}}>
                    <Text>{dateToDisplayDateShort(prayer.dhuhrChangeDate)}</Text>
                    <Text>{time24To12(prayer.dhuhrChange)}</Text>
                </View>
            </View>

            <View style={{...styles.row, ...styles.rowInactive}}>
                <Text style={{...styles.prayerName, ...styles.cell, ...styles.column1}}>
                    Asr
                </Text>
                <Text style={{...styles.prayerAzan, ...styles.cell, ...styles.column2}}>
                    {time24To12(prayer.asr)}
                </Text>
                <Text style={{...styles.prayerIqama, ...styles.cell, ...styles.column3}}>
                    {time24To12(prayer.asrIqama)}
                </Text>
                <View style={{...styles.prayerNextChange, ...styles.cell, ...styles.column4}}>
                    <Text>{dateToDisplayDateShort(prayer.asrChangeDate)}</Text>
                    <Text>{time24To12(prayer.asrChange)}</Text>
                </View>
            </View>

            <View style={{...styles.row, ...styles.rowInactive}}>
                <Text style={{...styles.prayerName, ...styles.cell, ...styles.column1}}>
                    Maghrib
                </Text>
                <Text style={{...styles.prayerAzan, ...styles.cell, ...styles.column2}}>
                    {time24To12(prayer.maghrib)}
                </Text>
                <Text style={{...styles.prayerIqama, ...styles.cell, ...styles.column3}}>
                    {prayer.maghrib}
                </Text>
                <View style={{...styles.prayerNextChange, ...styles.cell, ...styles.column4}}>
                </View>
            </View>

            <View style={{...styles.row, ...styles.rowInactive}}>
                <Text style={{...styles.prayerName, ...styles.cell, ...styles.column1}}>
                    Isha
                </Text>
                <Text style={{...styles.prayerAzan, ...styles.cell, ...styles.column2}}>
                    {time24To12(prayer.isha)}
                </Text>
                <Text style={{...styles.prayerIqama, ...styles.cell, ...styles.column3}}>
                    {time24To12(prayer.ishaIqama)}
                </Text>
                <View style={{...styles.prayerNextChange, ...styles.cell, ...styles.column4}}>
                    <Text>{dateToDisplayDateShort(prayer.ishaChangeDate)}</Text>
                    <Text>{time24To12(prayer.ishaChange)}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: "row" },
    cell: {padding: 3, alignContent: "center", justifyContent:"center"},
    column1: {},
    column2: {},
    column3: {},
    column4: {},
    rowHeading: {},
    rowInactive: {backgroundColor: "#AAAAAA"},
    rowActive: {backgroundColor: "#CCCCCC"},
    prayerName: {},
    prayerAzan: {},
    prayerIqama: {},
    prayerNextChange: {},
});

