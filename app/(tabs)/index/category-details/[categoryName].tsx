import ItemList from "@/components/ItemList";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CategoryDetailsScreen() {
  const { categoryName } = useLocalSearchParams();

  return (
    <View>
      <ItemList />
    </View>
  );
}
