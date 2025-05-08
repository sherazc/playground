import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {

  const [myStorage, setMyStorage] = useState<string>("Nothing stored yet")

  const handleSetStorage = () => {
    console.log("Set value in storage");
    AsyncStorage.setItem("myStorage", "New Value: " + new Date().toISOString());
  }

  const handleGetStorage = () => {
    console.log("Get value from storage");
    AsyncStorage.getItem("myStorage").then(value => setMyStorage(value as string));
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
        <TouchableOpacity onPress={handleSetStorage}>
          <Text>Set value in store</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGetStorage}>
          <Text>get value from store</Text>
        </TouchableOpacity>

        <Text>{myStorage}</Text>


      </ScrollView>
    </View>
  );
}
