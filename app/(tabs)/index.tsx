import Header from "@/components/HomeScreen/Header";
import { View } from "@/components/Themed";

export default function HomeScreen() {
  return (
    <View className="py-8 px-6 flex-1">
      <Header />
      <View
        className="my-7 h-px w-3/4 bg-gray-200"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}
