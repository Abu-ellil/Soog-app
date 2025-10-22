import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
 title: string;
 showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, rightComponent }) => {
 const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <View className="flex-1 items-start">
        {showBackButton && (
          <TouchableOpacity onPress={handleBack} className="p-1">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      
      <View className="flex-1 items-center">
        <Text className="text-lg font-bold text-black">{title}</Text>
      </View>
      
      <View className="flex-1 items-end">
        {rightComponent}
      </View>
    </View>
  );
};


export default Header;