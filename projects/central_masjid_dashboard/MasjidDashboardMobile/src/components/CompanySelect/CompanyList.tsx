import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { CompanyListData, Company } from '../../types/types';

interface Props {
    companyListData: CompanyListData;
}

export const CompanyList: React.FC<Props> = ({ companyListData }) => {
    return (
        <View style={styles.container}>
            <Text>Select Masjid</Text>
            {buildCompanyFlatList(companyListData)}

        </View>
    );
}


const buildCompanyFlatList = (cld?: CompanyListData) => {

    if (!cld || !cld.companies || cld.companies.length < 1) {
        return (<View><Text>Loading...</Text></View>);
    }

    return (
        <View>
            <FlatList
                data={cld.companies}
                // @ts-ignore
                renderItem={buildCompanyListItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const buildCompanyListItem = ({ item, onPress, style }: { item: Company, onPress: Function, style: object }) => {
    return (
        <View>
            <Text>{item.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        borderRadius: 5
    }
});
