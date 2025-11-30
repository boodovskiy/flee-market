import { Category } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CategoriesProps {
  categoryList: Category[];
}

export default function Categories({ categoryList }: CategoriesProps) {
  return (
    <View className="mt-3">
      <Text className="font-bold  text-[20px]">Categories</Text>
      <View className="flex-row flex-wrap">
        {categoryList.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="w-1/4 items-center justify-center p-2 border-[1px] border-blue-200 m-1 h-[80px] rounded-lg bg-blue-50"
            style={{ width: "23%" }}
            onPress={() =>
              router.push({
                pathname: "./(category-details)/[categoryName]",
                params: { categoryName: item.name },
              })
            }
          >
            <Image source={{ uri: item.icon }} className="w-[40px] h-[40px]" />
            <Text className="mt-1 text-center text-[12px]">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
