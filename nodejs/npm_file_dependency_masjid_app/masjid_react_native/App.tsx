import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {add, getAllMasjid, Masjid} from "masjid_lib";

export default function App() {
    const masjid: Masjid = {name: "Masjid A", address: "Address A"};
    const masjids:Array<Masjid> = getAllMasjid();
    const result = add(300, 400);
    return (
        <View style={styles.container}>
            <Text>
                Open up App.tsx to start working on your app!
            </Text>
            <Text>
                {masjid.name}
            </Text>
            <Text>
                {masjids[0].name}
            </Text>
            <Text>
                {result}
            </Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
