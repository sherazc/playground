import React from "react";
import { Button, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch } from "../store/rootReducer";

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const Settings: React.FC<Props> = ({navigation}) => {
    const dispatch = useTypedDispatch();

    const onResetMasjid = () => {
        dispatch({type: "COMPANY_DATA_DELETE"});
        navigation.navigate("MasjidSelect");
    }

    return (
        <View>
            <Button title="Reset Masjid" onPress={onResetMasjid}/>
        </View>
    );
}
