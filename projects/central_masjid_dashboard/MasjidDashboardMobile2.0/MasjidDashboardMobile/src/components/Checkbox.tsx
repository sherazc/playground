import React from 'react';
import { CheckboxCheck } from '../images/CheckboxCheck';
import { TouchableOpacity } from "react-native";
import CheckboxUncheck from '../images/CheckboxUncheck';

interface Props {
    checked?: boolean;
    width?: number;
    height?: number;
    fill?: string;
    onPress?: () => void;
}

export const Checkbox: React.FC<Props> = ({
    onPress = () => {},
    checked = false,
    width = 20,
    height = 20,
    fill = "#000"}) => {
    return(
        <TouchableOpacity style={{width,height}} onPress={onPress}>
            {checked && <CheckboxCheck width={width} height={height} fill={fill}/>}
            {!checked && <CheckboxUncheck width={width} height={height} fill={fill}/>}
        </TouchableOpacity>
    );
}