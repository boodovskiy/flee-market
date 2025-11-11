import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="category-details/[categoryName]" />
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
