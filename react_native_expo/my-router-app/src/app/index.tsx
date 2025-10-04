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
      <Link href="/about">Go to About Page</Link>
      <Button title="Home Page" onPress={() => router.push("/(myTabs)/home")} />
      {/* asChild will hide the Link, show the Child and 
      attach a router.push("/profile") handler to the child.
      Button, Pressable, TouchableOpacity can be used as Link's asChild */}
      <Link href="/(myTabs)/profile" asChild>
        <Button title="Profile Page" />
      </Link>

      <Link href="/blog/tech/100" asChild>
        <Button title="/blog/tech/100" />
      </Link>
      <Link href="/(singleSlot)/Screen1" asChild>
        <Button title="/(singleSlot)/Screen1" />
      </Link>
      <Link href="/(singleSlot)/Screen2" asChild>
        <Button title="/(singleSlot)/Screen2" />
      </Link>
    </View>
  );
}
