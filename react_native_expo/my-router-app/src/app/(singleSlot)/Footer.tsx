import { Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={{ height: 60, backgroundColor: "lightgreen", justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Custom Footer</Text>
      </View>
    </View>
  );
}