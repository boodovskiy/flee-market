import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import diary from "../../../assets/images/diary.png";
import logout from "../../../assets/images/logout.png";
import search from "../../../assets/images/search.png";

export default function ProfileScreen() {
  const { user } = useUser();
  const router = useRouter();
  const { isLoaded, signOut } = useAuth();
  const menuList = [
    { id: 1, name: "My Products", icon: diary, path: "/profile/my-products" },
    { id: 2, name: "Explore", icon: search, path: "/explore" },
    { id: 3, name: "SCase", icon: search, path: "/explore" },
    { id: 4, name: "Logout", icon: logout, path: "/login" },
  ];

  const onMenuPress = (item: any) => {
    if (item.name === "Logout") {
      // Handle logout logic here
      if (isLoaded) {
        signOut();
      }
      return;
    }
    router.push(item.path as any);
  };

  return (
    <View className="p-5 bg-white flex-1">
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
      <FlatList
        data={menuList}
        numColumns={3}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuPress(item)}
            className="flex-1 p-3 border-[1px] items-center mx-2 mt-4 rounded-lg border-blue-400 bg-blue-50"
          >
            <Image source={item?.icon} className="w-[50px] h-[50px]" />
            <Text className="text-[12px] mt-2 text-blue-700">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
