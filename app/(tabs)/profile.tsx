import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Image, Text, View } from "react-native";
import diary from "../../assets/images/diary.png";
import logout from "../../assets/images/logout.png";
import search from "../../assets/images/search.png";

export default function ProfileScreen() {
  const { user } = useUser();
  const menuList = [
    { id: 1, name: "My Products", icon: diary },
    { id: 2, name: "Explore", icon: search },
    { id: 3, name: "SCase", icon: search },
    { id: 4, name: "Logout", icon: logout },
  ];

  return (
    <View className="p-5">
      <View className="items-center mt-14">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full"
        />
        <Text className="text-[25px] font-bold mt-5">{user?.fullName}</Text>
        <Text className="text-[18px] text-gray-500 mt-2">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
    </View>
  );
}
