import { Text, View } from "@/components/Themed";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-2xl text-red-500">Home!</Text>
      <View
        className="my-7 h-px w-3/4 bg-gray-200"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        {/* <SignOutButton /> */}
      </SignedIn>
      <SignedOut>
        <Link href="../(auth)">
          <Text>Sign in</Text>
        </Link>
        <Link href="../(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
