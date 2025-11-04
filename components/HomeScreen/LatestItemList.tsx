import { PostItem } from "@/types";
import React from "react";
import { Text, View } from "react-native";

interface LatestItemListProps {
  latestItemList: PostItem[];
}

export default function LatestItemList({
  latestItemList,
}: LatestItemListProps) {
  return (
    <View>
      <Text>Latest Items</Text>
    </View>
  );
}
