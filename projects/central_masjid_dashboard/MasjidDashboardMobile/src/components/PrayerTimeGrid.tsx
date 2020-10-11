import React from 'react';
import { Text } from 'react-native';
import { Prayer } from '../types/types';

interface Props {
    prayer: Prayer;
}

export const PrayerTimeGrid: React.FC<Props> = () => {
    return(<Text>PrayerTimeGrid</Text>);
}