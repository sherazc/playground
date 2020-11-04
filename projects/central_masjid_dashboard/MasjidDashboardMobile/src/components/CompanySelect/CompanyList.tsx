import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CompanyListData } from "../../types/types";

interface Props {
    companyListData: CompanyListData;
}

export const CompanyList: React.FC<Props> = ({companyListData}) => {
    return (
        <View style={styles.container}>
            <Text>Company List component</Text>
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
