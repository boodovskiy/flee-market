import { PostItemType } from "@/types";
import React from "react";
import { FlatList, Text, View } from "react-native";
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
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => <PostItem item={item} key={index} />}
      />
    </View>
  );
}
