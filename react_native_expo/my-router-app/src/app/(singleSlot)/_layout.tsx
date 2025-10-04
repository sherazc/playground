import { Slot } from "expo-router";
import { View } from "react-native";
import Footer from "./Footer";
import Header from "./Header";

export default function CustomLayout({children}: {children: React.ReactNode }) {
  return (  
    <View style={{ flex: 1 }}>
      <Header/>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <Footer/>
    </View>
  );
}