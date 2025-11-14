import { PostItemType } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function ProductDetail() {
  const { item } = useLocalSearchParams();
  const [product, setProduct] = useState<PostItemType[]>([]);

  useEffect(() => {
    console.log(item);
    //setProduct();
  }, [item]);

  return <View style={{ flex: 1 }}>{/* <Image /> */}</View>;
}
