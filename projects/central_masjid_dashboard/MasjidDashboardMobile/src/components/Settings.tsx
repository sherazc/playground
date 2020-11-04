import React from "react";
import { Button, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch } from "../store/rootReducer";

interface Props {
    navigation: StackNavigationProp<MdParamList, "CompanySelect">;
    route: RouteProp<MdParamList, "CompanySelect">;
}

export const Settings: React.FC<Props> = ({navigation}) => {
    const dispatch = useTypedDispatch();

    const onResetMasjid = () => {
        dispatch({type: "COMPANY_DATA_DELETE"});
        navigation.navigate("CompanySelect");
    }

    return (
        <View>
            <Button title="Reset Masjid" onPress={onResetMasjid}/>
        </View>
    );
}
