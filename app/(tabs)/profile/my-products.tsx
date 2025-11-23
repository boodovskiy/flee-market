import { app } from "@/firebaseConfig";
import { PostItemType } from "@/types";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import LatestItemList from "../../../components/HomeScreen/LatestItemList";

export default function MyProducts() {
  const { user } = useUser();
  const [itemList, setItemList] = useState<PostItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const db = getFirestore(app);

  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Products",
      headerShown: true,
    });
  }, []);

  const getUserPost = async () => {
    setLoading(true);
    const posts: PostItemType[] = [];
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PostItemType, "id">;
      posts.push({
        id: doc.id,
        ...data,
      });
    });

    setItemList(posts);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-24" />
      ) : itemList?.length > 0 ? (
        <LatestItemList latestItemList={itemList} heading="" />
      ) : (
        <Text className="p-5 text-[20px] text-gray-400 justify-center text-center mt-24">
          No products found.
        </Text>
      )}
    </View>
  );
}
