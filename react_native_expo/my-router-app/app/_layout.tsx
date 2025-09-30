import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{ title: "Index Page" }} />
      <Stack.Screen name="about" options={{ title: "About Us" }} />
      {/*  "headerShown: false" hides the Stack Nav header */}
      <Stack.Screen name="(tabs)" options={{ title: "Dashboard", headerShown: false }} />
    </Stack>
  );
}
