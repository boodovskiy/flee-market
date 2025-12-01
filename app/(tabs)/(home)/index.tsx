import Categories from "@/components/HomeScreen/Categories";
import Header from "@/components/HomeScreen/Header";
import LatestItemList from "@/components/HomeScreen/LatestItemList";
import Slider from "@/components/HomeScreen/Slider";
import { View } from "@/components/Themed";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { app } from "../../../firebaseConfig";
import { Category, PostItemType, SliderItem } from "../../../types";

export default function HomeScreen() {
  const db = useMemo(() => getFirestore(app), []);
  const [sliderList, setSliderList] = useState<SliderItem[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [latestItemList, setLatestItemList] = useState<PostItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const getSliders = async (): Promise<SliderItem[]> => {
    try {
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

      return data;
    } catch (error) {
      console.error("Error fetching sliders:", error);
      return [];
    }
  };

  const getCategoryList = async (): Promise<Category[]> => {
    try {
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
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const getLatestItemList = async (): Promise<PostItemType[]> => {
    try {
      const posts: PostItemType[] = [];
      const querySnapshot = await getDocs(
        query(collection(db, "UserPost"), orderBy("createdAt", "desc"))
      );
      querySnapshot.forEach((doc) => {
        console.log(`Docs: ${doc.id} => ${JSON.stringify(doc.data())}`);

        // 2. Assert the type of the document data (omitting 'id')
        const data = doc.data() as Omit<PostItemType, "id">;

        posts.push({
          id: doc.id, // Get the document ID
          ...data, // Spread the rest of the data
        });
      });

      return posts;
    } catch (error) {
      console.error("Error fetching latest items:", error);
      return [];
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      const [sliders, categories, latestItems] = await Promise.all([
        getSliders(),
        getCategoryList(),
        getLatestItemList(),
      ]);

      if (isMounted) {
        setSliderList(sliders);
        setCategoryList(categories);
        setLatestItemList(latestItems);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="py-8 px-6"
    >
      <Header />
      <View
        className="my-7 h-px w-3/4 bg-gray-200"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItemList
        latestItemList={latestItemList}
        heading={"Latest Items"}
      />
    </ScrollView>
  );
}

HomeScreen.options = {
  headerShown: false,
};
