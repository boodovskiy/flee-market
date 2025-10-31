import Header from "@/components/HomeScreen/Header";
import Slider from "@/components/HomeScreen/Slider";
import { View } from "@/components/Themed";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SliderItem } from "../../types";
import { app } from "../firebaseConfig";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState<SliderItem[]>([]);

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      setSliderList((prev) => [...prev, doc.data() as SliderItem]);
    });
  };

  useEffect(() => {
    getSliders();
  }, []);
  return (
    <View className="py-8 px-6 flex-1">
      <Header />
      <View
        className="my-7 h-px w-3/4 bg-gray-200"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Slider sliderList={sliderList} />
    </View>
  );
}
