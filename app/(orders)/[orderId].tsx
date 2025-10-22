import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import Header from '../../components/Header';
import { api } from '../../lib/api';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  storeName: string;
  deliveryAddress: string;
  orderDate: string;
  estimatedDelivery: string;
}

export default function OrderStatusScreen() {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for order
  const mockOrder: Order = {
    id: orderId as string,
    items: [
      { id: '1', name: 'أرز أبيض', price: 15, quantity: 2 },
      { id: '2', name: 'زيت صافي', price: 20, quantity: 1 },
      { id: '3', name: 'سكر', price: 12, quantity: 1 },
    ],
    total: 62,
    status: 'preparing',
    storeName: 'بقالة الأسد',
    deliveryAddress: 'المنزل، الشارع الرئيسي، القرية',
    orderDate: '2023-05-15 10:30',
    estimatedDelivery: '2023-05-15 10:50',
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
      return;
    }
    loadOrder();
  }, [isAuthenticated]);

  const loadOrder = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to fetch order details
      // const response = await api.get(`/orders/${orderId}`);
      // setOrder(response.data);
      setOrder(mockOrder);
    } catch (error) {
      console.error('Error loading order:', error);
      alert('حدث خطأ أثناء تحميل تفاصيل الطلب');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'confirmed': return 'تم التأكيد';
      case 'preparing': return 'جاري التحضير';
      case 'on_the_way': return 'في الطريق';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'تم الإلغاء';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#28a745';
      case 'preparing': return '#17a2b8';
      case 'on_the_way': return '#007bff';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
 };

  if (loading || !order) {
    return (
      <View style={styles.loadingContainer}>
        <Text>جاري تحميل تفاصيل الطلب...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="حالة الطلب" showBackButton />
      <ScrollView style={styles.content}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>رقم الطلب: {order.id}</Text>
          <View style={[styles.statusContainer, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
              {getStatusText(order.status)}
            </Text>
          </View>
          <Text style={styles.orderDate}>تاريخ الطلب: {order.orderDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المتجر</Text>
          <Text style={styles.sectionText}>{order.storeName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>عنوان التوصيل</Text>
          <Text style={styles.sectionText}>{order.deliveryAddress}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المنتجات</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>{item.quantity} × {item.price} = {item.quantity * item.price} جنيه</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإجمالي</Text>
          <Text style={styles.totalAmount}>{order.total} جنيه</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الوقت المقدر للتسليم</Text>
          <Text style={styles.sectionText}>{order.estimatedDelivery}</Text>
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
  orderInfo: {
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
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  section: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
 itemName: {
    fontSize: 14,
    color: '#333',
    flex: 2,
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    flex: 1,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'right',
  },
});