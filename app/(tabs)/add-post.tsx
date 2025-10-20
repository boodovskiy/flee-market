import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
    <View className="p-10">
      <Formik
        initialValues={{
          title: "",
          description: "",
          category: "",
          address: "",
          price: "",
          image: "",
        }}
        onSubmit={(value) => console.log(value)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values.title}
              onChangeText={handleChange("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values.description}
              numberOfLines={5}
              onChangeText={handleChange("description")}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            />
            {/* Category List Dropdown */}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="p-4 bg-blue-500 mt-7 rounded-lg"
            >
              <Text className="text-white text-center uppercase">Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
});
