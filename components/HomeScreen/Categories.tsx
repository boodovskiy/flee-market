import { Category } from "@/types";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface CategoriesProps {
  categoryList: Category[];
}

export default function Categories({ categoryList }: CategoriesProps) {
  return (
    <View className="mt-3">
      <Text className="font-bold  text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="flex-1 items-center justify-center p-2 border-[1px] border-blue-200 m-1 h-[80px] rounded-lg bg-blue-50"
            onPress={() =>
              router.push({
                pathname: "./category-details/[categoryName]",
                params: { categoryName: item.name },
              })
            }
          >
            <Image source={{ uri: item.icon }} className="w-[40px] h-[40px]" />
            <Text className="mt-1 text-center text-[12px]">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
