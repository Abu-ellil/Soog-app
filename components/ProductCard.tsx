import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  storeId: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <View className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm shadow-gray-300">
      <Image source={{ uri: product.image }} className="w-full h-36 object-cover" />
      <View className="p-3">
        <Text className="text-base font-bold mb-1 text-gray-800">{product.name}</Text>
        <Text className="text-sm text-gray-600 mb-2 flex-1" numberOfLines={2}>{product.description}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-primary">{product.price} جنيه</Text>
          <TouchableOpacity className="bg-primary w-9 h-9 rounded-full justify-center items-center" onPress={onAddToCart}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default ProductCard;