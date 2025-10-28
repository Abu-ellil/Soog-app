import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
      <View className="flex-1 justify-center items-center bg-light-gray">
        <Text>جاري تحميل تفاصيل الطلب...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-light-gray">
      <Header title="حالة الطلب" showBackButton />
      <ScrollView className="flex-1 p-4">
        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-lg font-bold mb-2 text-gray-800">رقم الطلب: {order.id}</Text>
          <View className="w-fit px-3 py-1 rounded-full mb-2" style={{ backgroundColor: `${getStatusColor(order.status)}20` }}>
            <Text className="text-base font-bold" style={{ color: getStatusColor(order.status) }}>
              {getStatusText(order.status)}
            </Text>
          </View>
          <Text className="text-sm text-gray-600">تاريخ الطلب: {order.orderDate}</Text>
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-base font-bold mb-2 text-gray-800">المتجر</Text>
          <Text className="text-sm text-gray-600">{order.storeName}</Text>
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-base font-bold mb-2 text-gray-800">عنوان التوصيل</Text>
          <Text className="text-sm text-gray-600">{order.deliveryAddress}</Text>
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-base font-bold mb-2 text-gray-800">المنتجات</Text>
          {order.items.map((item) => (
            <View key={item.id} className="flex-row justify-between py-2 border-b border-gray-200">
              <Text className="text-sm text-gray-800 flex-2">{item.name}</Text>
              <Text className="text-sm text-gray-600 text-right flex-1">{item.quantity} × {item.price} = {item.quantity * item.price} جنيه</Text>
            </View>
          ))}
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-base font-bold mb-2 text-gray-800">الإجمالي</Text>
          <Text className="text-lg font-bold text-primary text-right">{order.total} جنيه</Text>
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-base font-bold mb-2 text-gray-800">الوقت المقدر للتسليم</Text>
          <Text className="text-sm text-gray-600">{order.estimatedDelivery}</Text>
        </View>
      </ScrollView>
    </View>
  );
}