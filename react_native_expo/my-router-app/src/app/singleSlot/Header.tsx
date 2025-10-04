import { Text, View } from "react-native";

export default function Header() {
  return (
    <View style={{ height: 60, backgroundColor: "lightblue", justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Custom Header</Text>
      </View>
    </View>
  );
}