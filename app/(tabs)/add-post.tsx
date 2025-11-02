import { useUser } from "@clerk/clerk-expo";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik, FormikErrors } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Category } from "../../types";
import { app } from "../firebaseConfig";

interface FormValues {
  title: string;
  description: string;
  category: string;
  address: string;
  price: string;
  image: string;
}

export default function AddPostScreen() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);
  const db = getFirestore(app);
  const storage = getStorage();

  const { user } = useUser();

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value: any) => {
    setLoading(true);
    // Convert URI to Blob File
    const response = await fetch(image || "");
    const blob = await response.blob();

    const storageRef = ref(storage, "images/" + new Date().getTime() + ".jpg");

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          value.image = downloadURL;

          value.userName = user?.fullName || "Anonymous";
          value.userEmail = user?.primaryEmailAddress?.emailAddress || "";
          value.userImage = user?.imageUrl || "";

          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            console.log("Document added with ID: ", docRef.id);
            setLoading(false);
            Alert.alert("Success", "Post added successfully");
          }
        });
      });
  };

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
          userName: "",
          userEmail: "",
          userImage: "",
        }}
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(values) => {
          const errors: FormikErrors<FormValues> = {};
          if (!values.title) {
            console.log("Title is required");
            ToastAndroid.show("Title is required", ToastAndroid.SHORT);
            errors.title = "Title is required";
          }
          return errors;
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Image
                  source={require("./../../assets/images/placeholder.jpg")}
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                />
              )}
            </TouchableOpacity>
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
              onChangeText={handleChange("address")}
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
              style={{ backgroundColor: loading ? "#ccc" : "#007BFF" }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center uppercase">Submit</Text>
              )}
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
