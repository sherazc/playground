import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { CompanyListData, Company } from "mdb-core-js";
import { isNotBlankString, nameToInitials, stringToHslColor, trimEllipsis } from "mdb-core-js";
import ArrowRight from "../../images/ArrowRight";
import { ConstantsStyles } from "../../services/Constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "../NavRoutes";
import { StackActions } from "@react-navigation/native";

interface Props {
    companyListData: CompanyListData;
    navigation: StackNavigationProp<MdParamList, "CompanySelect">;
}

export const CompanyList: React.FC<Props> = ({ companyListData, navigation }) => {

    const onSetCompany = (selectedCompanyId: string) => {
        if (!selectedCompanyId) {
            return;
        }
        const selectedCompany = companyListData.companies.find(c => c.id === selectedCompanyId);
        if (selectedCompany) {
            // This will add screen to the stack
            navigation.navigate("PrayerTime", { selectedCompany });
            // This will not
            // navigation.dispatch(StackActions.replace("PrayerTime", { selectedCompany }));
        }
    }

    const buildCompanyFlatList = (cld: (CompanyListData | undefined)) => {
        if (!cld || !cld.companies || cld.companies.length < 1) {
            return (<View><Text>Loading...</Text></View>);
        }

        return (
            <View style={styles.listContainer}>
                
                <FlatList
                    data={cld.companies}
                    // @ts-ignore
                    renderItem={buildCompanyListItem}
                    keyExtractor={item => item.id}
                />
                
            </View>
        );
    }

    const buildCompanyListItem = ({ item }: { item: Company }) => {
        if (!item || !item.id) {
            return;
        }
        let companyName = item.name ? item.name : "";
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
            <TouchableOpacity style={styles.listItem} onPress={() => onSetCompany(item.id)}>
                <View style={{
                    ...styles.companyIcon,
                    backgroundColor: stringToHslColor(companyName, 50, 70)
                }}>
                    <Text style={styles.companyIconInitials}>
                        {nameToInitials(companyName)}
                    </Text>
                </View>
                <View style={styles.listItemName}>
                    <Text style={{ fontSize: 16, color: ConstantsStyles.text.colorDark }}>{trimEllipsis(companyName, 25)}</Text>
                    <Text style={{ fontSize: 12, color: ConstantsStyles.text.colorDark }}>{trimEllipsis(companyAddress, 40)}</Text>
                </View>
                <View style={styles.listItemArrow}>
                    <ArrowRight height={15} width={15} fill="#aeaeae" />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.listLabel}>Select Masjid</Text>
            {buildCompanyFlatList(companyListData)}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ConstantsStyles.color.background4,
        width: "100%",
        height: "100%",
        borderRadius: 10,
        padding: 20,
        ...ConstantsStyles.shadowSmallDark
    },
    listContainer: {
        height: "85%"
    },
    listLabel: {
        fontSize: 20,
        marginBottom: 20,
        color: ConstantsStyles.text.colorDark
    },
    listItem: {
        backgroundColor: ConstantsStyles.color.background5,
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
        color: ConstantsStyles.text.colorLight,
        fontSize: 20
    },
    listItemName: {
        height: 50,
        flexGrow: 1,
        justifyContent: "center",
        paddingLeft: 10,
    },
    listItemArrow: {
        width: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
});
