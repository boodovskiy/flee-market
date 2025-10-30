import Header from "@/components/HomeScreen/Header";
import Slider from "@/components/HomeScreen/Slider";
import { View } from "@/components/Themed";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { app } from "../firebaseConfig";

export default function HomeScreen() {
  const db = getFirestore(app);
  const getSliders = async () => {
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
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
      <Slider />
    </View>
  );
}
