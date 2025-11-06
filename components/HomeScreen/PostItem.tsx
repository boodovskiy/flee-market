import { Image, Text, TouchableOpacity, View } from "react-native";
import { PostItem } from "../../types/PostItem";

export default function PostItem({ item }: { item: PostItem }) {
  return (
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
  );
}
