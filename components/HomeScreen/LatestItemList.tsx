import { PostItemType } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import PostItem from "./PostItem";

interface LatestItemListProps {
  latestItemList: PostItemType[];
  heading?: string;
}

export default function LatestItemList({
  latestItemList,
  heading,
}: LatestItemListProps) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <View className="flex-row flex-wrap">
        {latestItemList.map((item) => (
          <View key={item.id} className="w-1/2 p-1">
            <PostItem item={item} />
          </View>
        ))}
      </View>
    </View>
  );
}
