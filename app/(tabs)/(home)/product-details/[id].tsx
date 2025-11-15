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
    <View style={{ flex: 1 }}>
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
    </View>
  );
}
