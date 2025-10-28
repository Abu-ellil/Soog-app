import React from "react";
import { View } from "react-native";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-1 mx-6">
      {children}
    </View>
  );
};
