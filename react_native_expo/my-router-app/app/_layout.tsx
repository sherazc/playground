import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{ title: "Index Page", 
        // headerBackVisible: false, 
        animation: "none" 
      }} />
      <Stack.Screen name="about" options={{ title: "About Us" }} />
      {/*  "headerShown: false" hides the Stack Nav header */}
      <Stack.Screen name="(tabs)" options={{ title: "Dashboard", headerShown: false }} />

      <Stack.Screen name="blog/[category]/[postId]" options={({route}) => {
        // important: params are string[]. thats why we have to make postId as string
        const { category, postId } = route.params as { category: string; postId: string };
        return { title: `Blog - ${category} - ${postId}` };
      }} />
    </Stack>
  );
}
