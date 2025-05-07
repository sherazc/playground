import {ScrollView, Text, Touchable, TouchableOpacity, View} from "react-native";
import {useState} from "react";

export default function Index() {

  const [myStorage, setMyStorage] = useState<string>("Nothing stored yet")

  const handleStore = () => {
    console.log("test");

  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <TouchableOpacity onPress={handleStore}>
          <Text>Click to store</Text>
        </TouchableOpacity>
        <Text>{myStorage}</Text>

      </ScrollView>
    </View>
  );
}
