import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
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
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} جنيه</Text>
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decreaseQuantity(item.id)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.quantity}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => increaseQuantity(item.id)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTotal}>{item.price * item.quantity} جنيه</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="السلة" showBackButton />
      <ScrollView style={styles.content}>
        {items.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>السلة فارغة</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
            
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>الإجمالي ({getItemCount()} منتج)</Text>
                <Text style={styles.summaryValue}>{getTotalPrice()} جنيه</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#66',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  quantityButton: {
    backgroundColor: '#007bff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#66',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});