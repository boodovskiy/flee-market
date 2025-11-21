import { PostItemType } from "@/types";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PostItem({ item }: { item: PostItemType }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "./product-details/[id]",
      params: { item: encodeURIComponent(JSON.stringify(item)) },
    });
  };

  return (
    <TouchableOpacity
      className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
      onPress={handlePress}
    >
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
