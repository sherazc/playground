import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";

export type ProfileParamType = {
  name: string;
  ageString: string;
  roles: string[];
  companyJsonString: string
};

export type CompanyType = {
  name: string;
  location: string;
  foundedDate: Date;

};

export default function Index() {
  {/* 
  Params can be a object with this types string | string[] | undefined;
  Just like Http query params: 
    - all params will be converted to strings | string[] | undefined;
    - params can not be huge data.
    - for complex objects, serialize them to string (e.g. JSON.stringify())
  */}
  const getProfileParam = (): ProfileParamType => ({
    name: "Sheraz",
    ageString: "30",
    roles: ["Developer", "Designer"],
    companyJsonString: JSON.stringify({ name: "BitSegment", location: "USA", foundedDate: new Date(2020, 3, 12) })
  });

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
      <Link href="/singleSlot/Screen1" asChild>
        <Button title="/(singleSlot)/Screen1" />
      </Link>
      <Link href="/singleSlot/Screen2" asChild>
        <Button title="/(singleSlot)/Screen2" />
      </Link>
      <Link href={{
        pathname: "/Profile",
        params: getProfileParam(),
      }} asChild>
        <Button title="/Profile" />
      </Link>
    </View>
  );
}
