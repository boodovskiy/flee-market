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
    <View>
      <Text>ItemList</Text>
    </View>
  );
}
