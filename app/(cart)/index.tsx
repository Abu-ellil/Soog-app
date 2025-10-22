import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import { useCart } from '../../lib/hooks/useCart';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { api } from '../../lib/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  storeId: string;
}

export default function CartScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { items, updateItemQuantity, removeItem, getTotalPrice, getItemCount } = useCart();

  React.useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
      return;
    }
  }, [isAuthenticated]);

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert('السلة فارغة');
      return;
    }

    try {
      // In a real app, this would be an API call to place an order
      // const response = await api.post('/orders', { items });
      alert('تم إرسال الطلب بنجاح');
      router.replace('/'); // Navigate back to home after placing order
    } catch (error) {
      console.error('Error placing order:', error);
      alert('حدث خطأ أثناء إرسال الطلب');
    }
  };

  const increaseQuantity = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateItemQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item && item.quantity > 1) {
      updateItemQuantity(id, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeItem(id);
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View className="bg-white p-4 rounded-xl mb-3 flex-row items-center justify-between shadow-sm shadow-gray-300">
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800 mb-1">{item.name}</Text>
        <Text className="text-sm text-gray-600">{item.price} جنيه</Text>
      </View>
      
      <View className="flex-row items-center mx-4">
        <TouchableOpacity
          className="bg-primary w-7 h-7 rounded-full justify-center items-center"
          onPress={() => decreaseQuantity(item.id)}
        >
          <Text className="text-white text-lg font-bold">-</Text>
        </TouchableOpacity>
        
        <Text className="mx-3 text-base font-semibold min-w-[20] text-center">{item.quantity}</Text>
        
        <TouchableOpacity
          className="bg-primary w-7 h-7 rounded-full justify-center items-center"
          onPress={() => increaseQuantity(item.id)}
        >
          <Text className="text-white text-lg font-bold">+</Text>
        </TouchableOpacity>
      </View>
      
      <Text className="text-base font-bold text-primary">{item.price * item.quantity} جنيه</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-light-gray">
      <Header title="السلة" showBackButton />
      <ScrollView className="flex-1 p-4">
        {items.length === 0 ? (
          <View className="flex-1 justify-center items-center pt-12">
            <Text className="text-xl text-gray-600">السلة فارغة</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
            
            <View className="bg-white p-4 rounded-xl mt-4 shadow-sm shadow-gray-300">
              <View className="flex-row justify-between mb-4">
                <Text className="text-base font-semibold text-gray-800">الإجمالي ({getItemCount()} منتج)</Text>
                <Text className="text-base font-bold text-primary">{getTotalPrice()} جنيه</Text>
              </View>
              
              <Button
                title="إتمام الطلب"
                onPress={handlePlaceOrder}
                fullWidth
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}