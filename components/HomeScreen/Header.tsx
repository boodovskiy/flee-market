import { useUser } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      {/* User Info Section */}
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-[16px]">Welcome!</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>
      {/* Search Bar Section */}
      <View className="mt-5 p-[9px] flex flex-row items-center gap-2 bg-blue-50 border-[1px] border-blue-300 rounded-full px-5">
        <FontAwesome name="search" size={24} color="#6b7280" />
        <TextInput
          placeholder="Search"
          className="text-[18px]"
          onChangeText={(e) => console.log(e)}
        />
      </View>
    </View>
  );
}
