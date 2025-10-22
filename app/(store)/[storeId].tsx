import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
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
      <View style={styles.loadingContainer}>
        <Text>جاري تحميل بيانات المتجر...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={store.name} showBackButton />
      <ScrollView style={styles.content}>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={styles.storeDescription}>{store.description}</Text>
          
          <View style={styles.storeDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>التصنيف: {store.rating}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>وقت التوصيل: {store.deliveryTime}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>رسوم التوصيل: {store.deliveryFee} جنيه</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>المنتجات</Text>
        <View style={styles.productsContainer}>
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
  storeInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  storeDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  storeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});