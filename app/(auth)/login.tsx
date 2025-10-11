import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Image
        source={require("./../../assets/images/login.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8">
        <Text className="text-[35px] font-bold text-center">
          Community Marketplace
        </Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Buy / Sell Marketplace where you can sell old item and make real
          money!
        </Text>
        <TouchableOpacity
          onPress={() => console.log("sign-in")}
          className="p-4 bg-blue-500 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
