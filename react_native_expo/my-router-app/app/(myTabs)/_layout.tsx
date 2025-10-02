import { Tabs } from "expo-router";

export default function MyTabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home", headerShown: false}} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}