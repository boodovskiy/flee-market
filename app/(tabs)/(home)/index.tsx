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
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { app } from "../../../firebaseConfig";
import { Category, PostItemType, SliderItem } from "../../../types";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState<SliderItem[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [latestItemList, setLatestItemList] = useState<PostItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const getSliders = async () => {
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

      setSliderList(data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  const getCategoryList = async () => {
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
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getLatestItemList = async () => {
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

      setLatestItemList(posts);
    } catch (error) {
      console.error("Error fetching latest items:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getSliders(), getCategoryList(), getLatestItemList()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={() => (
        <>
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
        </>
      )}
      renderItem={() => null}
      keyExtractor={() => "dummy"}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="py-8 px-6"
    />
  );
}

HomeScreen.options = {
  headerShown: false,
};
