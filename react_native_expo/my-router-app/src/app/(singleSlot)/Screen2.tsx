import { Text, View } from "react-native";

export default function Screen2() {
  return (
    <View style={{ height: 60, backgroundColor: "lightyellow", justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Screen 2</Text>
      </View>
    </View>
  );
}