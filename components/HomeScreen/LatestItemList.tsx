import { PostItem } from "@/types";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface LatestItemListProps {
  latestItemList: PostItem[];
}

export default function LatestItemList({
  latestItemList,
}: LatestItemListProps) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Latest Items</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200">
            <Image
              source={{ uri: item.image }}
              className="w-full h-[120px] rounded-lg"
            />
            <View>
              <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
              <Text className="text-[20px] font-bold text-blue-500">
                $ {item.price}
              </Text>
              <Text className="text-blue-500 bg-blue-200 p-1 text-center rounded-full px-1 text-[10px] w-[70px] mt-2">
                {item.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
