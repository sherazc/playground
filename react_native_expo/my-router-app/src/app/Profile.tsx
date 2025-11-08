import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { CompanyType, ProfileParamType } from ".";

export default function Profile() {

  const profile = useLocalSearchParams<ProfileParamType>();
  const company = JSON.parse(profile.companyJsonString) as CompanyType;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Page</Text>
      <Text>Name: {profile.name}</Text>
      <Text>Age: {profile.ageString}</Text>
      <Text>Roles: {profile.roles}</Text>
      <Text>Company Name: {company.name}</Text>
      <Text>Company location: {company.location}</Text>
      <Text>Company founded Date: {company.foundedDate.toString()}</Text>
    </View>
  );
};