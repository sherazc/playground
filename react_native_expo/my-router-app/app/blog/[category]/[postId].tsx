import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BlogPost() {

  // important: params are string[]. thats why we have to make postId as string
  const {category, postId} = useLocalSearchParams<{category: string, postId: string}>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Blog post page category={category}, postId={postId}</Text>
    </View>
  );
}