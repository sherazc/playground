import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


export interface CompanyListVersion {
  id: string;
  version: number;
}

export default function App() {
  const a: CompanyListVersion = {
    id: "abc",
    version: 100
  }

  return (
    <View style={styles.container}>
      <Button title={a.id}/>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
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
