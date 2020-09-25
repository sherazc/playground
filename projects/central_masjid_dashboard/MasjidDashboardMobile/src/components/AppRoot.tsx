import React from "react";
import { View, Text } from "react-native"

let a: number = 1;

interface PropsCounter {
    count: number;
    age?: number;
}

const Counter: React.FC<PropsCounter> = ({ count }) => {
    return <Text>{count}</Text>;
}

interface Props {
    firstName: string;
    lastName: string;
}

export const AppRoot: React.FC<Props> = ({ firstName, lastName }) => {
    return <View>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
        <Counter count={5}/>
    </View>
}


