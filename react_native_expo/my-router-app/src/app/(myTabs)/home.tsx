import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Page</Text>
      <Button
        title="Go to Index (Clear History)"
        onPress={() => {
          // replace clears the stack history
          router.dismissAll();
          router.replace("/");
        }}
      />
    </View> 
  );
}