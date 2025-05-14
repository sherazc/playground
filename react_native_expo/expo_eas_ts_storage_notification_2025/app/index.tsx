import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  expoRegisterForNotificationsAsync,
  expoRemoveNotificationsAsync,
  expoScheduleNotificationAsync
} from "@/app/ExpoNotification";

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

  const handleShowNotification = () => {
    expoRemoveNotificationsAsync().then(() => { // Successfully removed
      expoRegisterForNotificationsAsync().then(registered => {
        if (registered) {
          try {
            console.log("Setting up notifications.");

            expoScheduleNotificationAsync("Notification test", `Message ${new Date().toISOString()}`, new Date(new Date().getDate() + (5 + 1000)))
              .then(() => console.log("Successfully set notification"))
              .catch(e => console.log("Failed set notification"));
          } catch (error) {
            console.log("Failed set notification, exception occurred", error);
          }
        } else {
          console.log("Failed set notification. Device not registered");
        }
      });


    }, (reason: any) => console.log("Failed to remove previously set notifications.", reason)); // Failed to remove notification
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

        <TouchableOpacity onPress={handleShowNotification}>
          <Text>Show Notification 2</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
