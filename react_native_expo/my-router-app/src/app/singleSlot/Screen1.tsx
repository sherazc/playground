import { Text, View } from "react-native";

export default function Screen1() {
  return (
    <View style={{ height: 60, backgroundColor: "lightyellow", justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Screen 1</Text>
      </View>
    </View>
  );
}