import React from "react";
import { FlatList, Image, View } from "react-native";
import { SliderItem } from "../../types";

interface SliderProps {
  sliderList: SliderItem[];
}

export default function Slider({ sliderList }: SliderProps) {
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={item.id}>
            <Image
              source={{ uri: item?.image }}
              className="h-[200px] w-[300px] mr-3 rounded-lg object-contain"
            />
          </View>
        )}
      />
    </View>
  );
}
