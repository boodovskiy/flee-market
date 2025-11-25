import { app } from "@/firebaseConfig";
import { PostItemType } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Linking,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<PostItemType | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, "UserPost", id as string);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...(snap.data() as any) } as PostItemType);
        } else {
          console.warn("Product not found:", id);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => shareProduct()}>
          <FontAwesome name="share" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, product]);

  const shareProduct = () => {
    const content = {
      message: product?.title + "\n" + product?.description,
    };
    Share.share(content)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const sendEmailMessage = () => {
    const subject = encodeURIComponent(
      `Inquiry about your product ${product?.title}`
    );
    const body = encodeURIComponent(
      `Hello ${product?.userName},\n\nI am interested in your product "${product?.title}". Please provide more details.\n\nThank you!`
    );
    Linking.openURL(
      `mailto:${product?.userEmail}?subject=${subject}&body=${body}`
    );
  };

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <Image source={{ uri: product?.image }} className="h-[350px] w-full" />

      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="p-1 px-2 rounded-full bg-blue-200 text-blue-500">
            {product?.category}
          </Text>
        </View>
        <Text className="mt-3 font-bold text-[20px]">Description</Text>
        <Text className="text-[17px] text-gray-500">
          {product?.description}
        </Text>
      </View>

      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
        <Image
          source={{ uri: product?.userImage }}
          className="h-12 w-12 rounded-full"
        />
        <View>
          <Text className="font-bold text-[18px]">{product?.userName}</Text>
          <Text className="text-gray-500">{product?.userEmail}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="z-40 bg-blue-500 rounded-full p-4 m-2"
        onPress={() => sendEmailMessage()}
      >
        // TODO: Check whether the user is the author of the post. // If so,
        hide the "Send Message" button and show a single "Delete" button
        instead. // (If additional actions are needed in the future, consider a
        menu of options.)
        <Text className="center text-white">Send Message</Text>
      </TouchableOpacity>
    </View>
  );
}
