import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function CategoryDetailsLayout() {
  const { categoryName } = useLocalSearchParams();

  return (
    <Stack>
      <Stack.Screen
        name="[categoryName]"
        options={{
          title: categoryName as string,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
