import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <Text>ProductDetail {id}</Text>
    </View>
  );
}
