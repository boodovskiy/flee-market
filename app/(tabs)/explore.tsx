import LatestItemList from "@/components/HomeScreen/LatestItemList";
import { app } from "@/firebaseConfig";
import { PostItemType } from "@/types";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ExploreScreen() {
  const [productList, setProductList] = useState<PostItemType[]>([]);
  const db = getFirestore(app);

  const getAllProducts = async () => {
    const posts: PostItemType[] = [];
    const q = query(collection(db, "UserPost"), orderBy("createdAt", "desc"));
    const querySnapshot = getDocs(q);

    (await querySnapshot).forEach((doc) => {
      const data = doc.data() as Omit<PostItemType, "id">;

      posts.push({
        id: doc.id, // Get the document ID
        ...data, // Spread the rest of the data
      });
    });

    setProductList(posts);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <View className="p-5 px-8 ">
      <Text className="text-[30px]">Explore More</Text>
      <LatestItemList latestItemList={productList} heading={""} />
    </View>
  );
}
