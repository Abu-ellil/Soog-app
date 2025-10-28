import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../lib/hooks/useAuth';
import Header from '../components/Header';
import StoreCard from '../components/StoreCard';
import { api } from '../lib/api';

interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
}

export default function HomeScreen() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Mock data for stores
  const mockStores: Store[] = [
    {
      id: '1',
      name: 'بقالة الأسد',
      description: 'أفضل المنتجات الطازجة',
      image: 'https://example.com/store1.jpg',
      rating: 4.5,
      deliveryTime: '15-20 دقيقة',
      deliveryFee: 10,
    },
    {
      id: '2',
      name: 'حلويات الفهد',
      description: 'حلويات شرقية وأجنبية',
      image: 'https://example.com/store2.jpg',
      rating: 4.8,
      deliveryTime: '20-25 دقيقة',
      deliveryFee: 15,
    },
    {
      id: '3',
      name: 'مخبز الفلاح',
      description: 'أفضل أنواع الخبز الطازج',
      image: 'https://example.com/store3.jpg',
      rating: 4.2,
      deliveryTime: '10-15 دقيقة',
      deliveryFee: 5,
    },
  ];

  useEffect(() => {
    // Only load stores if authenticated and not loading
    if (isAuthenticated) {
      loadStores();
    }
    // Removed the redirect logic since it's handled in _layout.tsx
    // and we might have dev bypass
  }, [isAuthenticated]);

  const loadStores = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to fetch stores
      // const response = await api.get('/stores');
      // setStores(response.data);
      setStores(mockStores);
    } catch (error) {
      console.error('Error loading stores:', error);
      alert('حدث خطأ أثناء تحميل المتاجر');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStores();
    setRefreshing(false);
  };

  const handleStorePress = (storeId: string) => {
    router.push(`/(store)/${storeId}`);
  };

  if (loading || isLoading) {
    return (
      <View className="bg-light-gray flex-1 items-center justify-center">
        <Text>جاري تحميل المتاجر...</Text>
      </View>
    );
  }

  return (
    <View className="bg-light-gray flex-1">
      <Header title="توصيلة" />
      <ScrollView
        className="flex-1 p-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text className="mb-4 text-xl font-bold text-gray-800">المتاجر القريبة</Text>
        <View className="flex-row flex-wrap justify-between">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} onPress={() => handleStorePress(store.id)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
