import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Index Page</Text>
      <Link href="/about">About Page</Link>
      <Button title="Home Page" onPress={() => router.push("/(tabs)/home")} />
      {/* asChild will hide the Link, show the Child and 
      attach a router.push("/profile") handler to the child.
      Button, Pressable, TouchableOpacity can be used as Link's asChild */}
      <Link href="/(tabs)/profile" asChild>
        <Button title="Profile Page" />
      </Link>
    </View>
  );
}
