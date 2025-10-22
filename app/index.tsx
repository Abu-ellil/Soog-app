import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView } from 'react-native';
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
  const { isAuthenticated } = useAuth();

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
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
      return;
    }
    loadStores();
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>جاري تحميل المتاجر...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="توصيلة" />
      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.sectionTitle}>المتاجر القريبة</Text>
        <View style={styles.storesContainer}>
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onPress={() => handleStorePress(store.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  storesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});