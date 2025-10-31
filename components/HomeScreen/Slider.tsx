import React from "react";
import { FlatList, Image, View } from "react-native";
import { SliderItem } from "../../types";

interface SliderProps {
  sliderList: SliderItem[];
}

export default function Slider({ sliderList }: SliderProps) {
  return (
    <View>
      <FlatList
        data={sliderList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item?.image }} className="h-[200px]" />
          </View>
        )}
      />
    </View>
  );
}
