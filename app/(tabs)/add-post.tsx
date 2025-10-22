import { Picker } from "@react-native-picker/picker";
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
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500  mb-7">
        Create New Post and Start Selling
      </Text>
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
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
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
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values?.address}
              onChangeText={handleChange("price")}
            />
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
              <Picker
                selectedValue={values?.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
                className="border-2"
              >
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
              </Picker>
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="p-4 bg-blue-500 mt-10 rounded-lg"
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
    textAlignVertical: "top",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
});
