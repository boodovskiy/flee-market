import { PostItemType } from "@/types";
import React from "react";
import { FlatList, Text, View } from "react-native";
import PostItem from "./PostItem";

interface LatestItemListProps {
  latestItemList: PostItemType[];
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
        renderItem={({ item, index }) => <PostItem item={item} key={index} />}
      />
    </View>
  );
}
