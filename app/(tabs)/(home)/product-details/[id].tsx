import { PostItemType } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function ProductDetail() {
  const { item } = useLocalSearchParams();
  const [product, setProduct] = useState<PostItemType | null>(null);

  useEffect(() => {
    console.log("hello:" + item);
    if (item) {
      try {
        const parsedItem: PostItemType = JSON.parse(item as string);
        setProduct(parsedItem);
      } catch (error) {
        console.error("Failed to parse item:", error);
      }
    }
  }, []);

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <Image source={{ uri: product?.image }} className="h-[350px] w-full" />

      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="p-1 px-2 rounded-full bg-blue-200 text-blue-500">
            {product?.category}
          </Text>
        </View>
        <Text className="mt-3 font-bold text-[20px]">Description</Text>
        <Text className="text-[17px] text-gray-500">
          {product?.description}
        </Text>
      </View>

      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
        <Image
          source={{ uri: product?.userImage }}
          className="h-12 w-12 rounded-full"
        />
        <View>
          <Text className="font-bold text-[18px]">{product?.userName}</Text>
          <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>
    </View>
  );
}
