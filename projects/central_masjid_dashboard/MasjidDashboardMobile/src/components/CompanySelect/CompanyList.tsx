import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { CompanyListData, Company } from '../../types/types';
import { isNotBlankString, nameToInitials, stringToHslColor, trimEllipsis } from '../../services/Utilities';
import RightArrow from "../../images/RightArrow";
import { ConstantsStyles } from "../../services/Constants";

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
    let companyName = item.name? item.name: "";
    let companyAddress = "";
    if (item.address) {
        if (isNotBlankString(item.address.city) && isNotBlankString(item.address.state)) {
            companyAddress = `${item.address.city}, ${item.address.state}`;
        } else if (isNotBlankString(item.address.city)) {
            companyAddress = item.address.city;
        } else if (isNotBlankString(item.address.state)) {
            companyAddress = item.address.state;
        }
    }

    return (
        <TouchableOpacity style={styles.listItem}>
            <View style={{
                    ...styles.companyIcon,
                    backgroundColor: stringToHslColor(companyName, 50, 70)
                }}>
                <Text style={styles.companyIconInitials}>
                    {nameToInitials(companyName)}
                </Text>
            </View>
            <View style={styles.listItemName}>
                <Text style={{fontSize: 16}}>{trimEllipsis(companyName, 25)}</Text>
                <Text style={{fontSize: 12}}>{trimEllipsis(companyAddress, 40)}</Text>
            </View>
            <View style={styles.listItemArrow}>
                <RightArrow height={15} width={15} fill="#aeaeae"/>
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
        padding: 20,
        ...ConstantsStyles.shadowSmallDark
    },
    listLabel: {
        fontSize: 20,
        marginBottom: 20
    },
    listItem: {
        backgroundColor: "#f0f0f0",
        marginBottom: 15,
        padding: 10,
        marginRight: 3,
        flexDirection: "row",
        borderRadius: 3,
        ...ConstantsStyles.shadowSmall
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
