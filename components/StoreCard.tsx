import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
}

interface StoreCardProps {
  store: Store;
  onPress: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onPress }) => {
  return (
    <TouchableOpacity className="w-[48%] bg-white rounded-xl overflow-hidden mb-4 shadow-sm shadow-gray-300" onPress={onPress}>
      <Image source={{ uri: store.image }} className="w-full h-32 object-cover" />
      <View className="p-3">
        <Text className="text-base font-bold mb-1 text-gray-800">{store.name}</Text>
        <Text className="text-sm text-gray-600 mb-2">{store.description}</Text>
        
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-sm font-semibold ml-1 text-gray-800">{store.rating}</Text>
          </View>
          
          <Text className="text-sm text-gray-600">{store.deliveryTime}</Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-semibold text-primary">رسوم التوصيل: {store.deliveryFee} جنيه</Text>
          <Ionicons name="chevron-forward" size={20} color="#007bff" />
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default StoreCard;