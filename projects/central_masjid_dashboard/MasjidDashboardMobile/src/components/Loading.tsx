import React from 'react';
import { Text } from 'react-native';

interface Props {
    style: object
}

export const Loading: React.FC<Props> = ({style}) => {
    return(<Text style={style}>Loading...</Text>);
}