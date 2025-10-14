import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }, []);

  return (
    <View>
      <Image
        source={require("./../../assets/images/login.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8">
        <Text className="text-[35px] font-bold text-center">
          Community Marketplace
        </Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Buy / Sell Marketplace where you can sell old item and make real
          money!
        </Text>
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          className="p-4 bg-blue-500 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
