import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { app } from "../firebaseConfig";

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function AddPostScreen() {
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);
  const db = getFirestore(app);

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

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <View>
      <Text>AddPostScreen</Text>
    </View>
  );
}
