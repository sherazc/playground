import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { CompanyListData, Company } from '../../types/types';
import { nameToInitials, stringToHslColor } from '../../services/Utilities';

interface Props {
    companyListData: CompanyListData;
}

export const CompanyList: React.FC<Props> = ({ companyListData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.listLabel}>Select Masjid</Text>
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
        <TouchableOpacity style={styles.listItem}>
            <View style={{
                    ...styles.companyIcon,
                    backgroundColor: stringToHslColor(item.name, 50, 70)
                }}>
                <Text style={styles.companyIconInitials}>
                    {nameToInitials(item.name)}
                </Text>
            </View>
            <View style={styles.listItemName}>
                <Text>{item.name}</Text>
            </View>
            <View style={styles.listItemArrow}>
                <Text>V</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        borderRadius: 10,
        padding: 20
    },
    listLabel: {
        fontSize: 20,
        marginBottom: 20
    },
    listItem: {
        backgroundColor: "#efefef",
        marginBottom: 10,
        padding: 10,
        flexDirection: "row"
    },
    companyIcon: {
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    companyIconInitials: {
        color: "#fff",
        fontSize: 20
    },
    listItemName: {
        height: 50,
        flexGrow: 1,
        justifyContent: "center",
        paddingLeft: 10
    },
    listItemArrow: {
        width: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
});
