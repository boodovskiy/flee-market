import { app } from "@/app/firebaseConfig";
import { PostItemType } from "@/types";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import LatestItemList from "./HomeScreen/LatestItemList";

type CategoryParams = {
  categoryName: string;
};

export default function ItemList() {
  const { categoryName } = useLocalSearchParams<CategoryParams>();
  const [itemList, setItemList] = useState<PostItemType[]>([]);

  const db = getFirestore(app);

  useEffect(() => {
    console.log(categoryName);
    categoryName && getItemListByCategory();
  }, [categoryName]);

  const getItemListByCategory = async () => {
    const posts: PostItemType[] = [];
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", categoryName)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(`Docs: ${doc.id} => ${JSON.stringify(doc.data())}`);

      const data = doc.data() as Omit<PostItemType, "id">;

      posts.push({
        id: doc.id, // Get the document ID
        ...data, // Spread the rest of the data
      });
    });

    setItemList(posts);
  };
  return (
    <View className="p-2">
      {itemList?.length > 0 ? (
        <LatestItemList latestItemList={itemList} heading={""} />
      ) : (
        <Text className="p-5 text-[20px] text-gray-400 justify-center text-center mt-24">
          No items found in this category.
        </Text>
      )}
    </View>
  );
}
