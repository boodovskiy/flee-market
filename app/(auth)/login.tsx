import React from "react";
import { Image, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Image
        source={require("./../../assets/images/login.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-10">
        <Text className="text-[30px]r font-bold text-center">
          Community Marketplace
        </Text>
      </View>
    </View>
  );
}
