import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="my-products" options={{ title: "My Products" }} />
      <Stack.Screen
        name="product-details/[id]"
        options={{
          headerShown: true,
          headerTitle: "Product Details",
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
