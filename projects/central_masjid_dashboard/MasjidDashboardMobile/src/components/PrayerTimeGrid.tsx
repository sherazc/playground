import React from 'react';
import { Text, View } from 'react-native';
import { Prayer } from '../types/types';

interface Props {
    prayer: Prayer;
}

export const PrayerTimeGrid: React.FC<Props> = ({ prayer }) => {
    return (
        <View>
            <Text>PrayerTimeGrid </Text>
            <Text>Date {prayer.date} </Text>
            <Text>Fajr:{prayer.fajr}</Text>
        </View>
    );
}
