import Categories from "@/components/HomeScreen/Categories";
import Header from "@/components/HomeScreen/Header";
import LatestItemList from "@/components/HomeScreen/LatestItemList";
import Slider from "@/components/HomeScreen/Slider";
import { View } from "@/components/Themed";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Category, PostItem, SliderItem } from "../../types";
import { app } from "../firebaseConfig";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState<SliderItem[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [latestItemList, setLatestItemList] = useState<PostItem[]>([]);

  const getSliders = async () => {
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    const data: SliderItem[] = [];

    querySnapshot.forEach((doc) => {
      const itemWithId: SliderItem = {
        id: doc.id,
        ...(doc.data() as { image: string }),
      };

      console.log(`${itemWithId.id} => ${JSON.stringify(itemWithId)}`);
      data.push(itemWithId);
    });

    setSliderList(data);
  };

  const getCategoryList = async () => {
    const categories: Category[] = [];
    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
      console.log(`Docs: ${doc.id} => ${JSON.stringify(doc.data())}`);

      const data = doc.data() as { name: string; icon: string };
      categories.push({
        id: doc.id, // Get the document ID
        ...data, // Spread the rest of the data
      });
    });
    setCategoryList(categories);
  };

  const getLatestItemList = async () => {
    const posts: PostItem[] = [];
    const querySnapshot = await getDocs(collection(db, "UserPost"));
    querySnapshot.forEach((doc) => {
      console.log(`Docs: ${doc.id} => ${JSON.stringify(doc.data())}`);

      // 2. Assert the type of the document data (omitting 'id')
      const data = doc.data() as Omit<PostItem, "id">;

      posts.push({
        id: doc.id, // Get the document ID
        ...data, // Spread the rest of the data
      });
    });

    setLatestItemList(posts);
  };

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
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
      <Categories categoryList={categoryList} />
      <LatestItemList latestItemList={latestItemList} />
    </View>
  );
}
