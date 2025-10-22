import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import { useCart } from '../../lib/hooks/useCart';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { api } from '../../lib/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  storeId: string;
}

interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
}

export default function StoreScreen() {
  const { storeId } = useLocalSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 // Mock data for store and products
 const mockStore: Store = {
    id: storeId as string,
    name: 'بقالة الأسد',
    description: 'أفضل المنتجات الطازجة',
    image: 'https://example.com/store1.jpg',
    rating: 4.5,
    deliveryTime: '15-20 دقيقة',
    deliveryFee: 10,
  };

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'أرز أبيض',
      description: 'أرز مصري عالي الجودة',
      price: 15,
      image: 'https://example.com/rice.jpg',
      storeId: storeId as string,
    },
    {
      id: '2',
      name: 'زيت صافي',
      description: 'زيت نباتي 800 مل',
      price: 20,
      image: 'https://example.com/oil.jpg',
      storeId: storeId as string,
    },
    {
      id: '3',
      name: 'سكر',
      description: 'سكر ناعم 1 كجم',
      price: 12,
      image: 'https://example.com/sugar.jpg',
      storeId: storeId as string,
    },
    {
      id: '4',
      name: 'شاي',
      description: 'شاي كرستال 50 كيس',
      price: 8,
      image: 'https://example.com/tea.jpg',
      storeId: storeId as string,
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
      return;
    }
    loadStoreData();
  }, [isAuthenticated]);

  const loadStoreData = async () => {
    setLoading(true);
    try {
      // In a real app, this would be API calls to fetch store and products
      // const storeResponse = await api.get(`/stores/${storeId}`);
      // const productsResponse = await api.get(`/stores/${storeId}/products`);
      // setStore(storeResponse.data);
      // setProducts(productsResponse.data);
      
      setStore(mockStore);
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error loading store data:', error);
      alert('حدث خطأ أثناء تحميل بيانات المتجر');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      storeId: product.storeId,
    };
    addItem(cartItem);
    alert('تم إضافة المنتج إلى السلة');
  };

  if (loading || !store) {
    return (
      <View className="flex-1 justify-center items-center bg-light-gray">
        <Text>جاري تحميل بيانات المتجر...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-light-gray">
      <Header title={store.name} showBackButton />
      <ScrollView className="flex-1 p-4">
        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-xl font-bold mb-2 text-gray-800">{store.name}</Text>
          <Text className="text-base text-gray-600 mb-3">{store.description}</Text>
          
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-sm text-gray-800">التصنيف: {store.rating}</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-gray-800">وقت التوصيل: {store.deliveryTime}</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-gray-800">رسوم التوصيل: {store.deliveryFee} جنيه</Text>
            </View>
          </View>
        </View>
        
        <Text className="text-lg font-bold mb-4 text-gray-800">المنتجات</Text>
        <View className="flex-row flex-wrap justify-between">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}