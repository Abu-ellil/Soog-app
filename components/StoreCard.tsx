import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: store.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{store.name}</Text>
        <Text style={styles.description}>{store.description}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{store.rating}</Text>
          </View>
          
          <Text style={styles.deliveryTime}>{store.deliveryTime}</Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.deliveryFee}>رسوم التوصيل: {store.deliveryFee} جنيه</Text>
          <Ionicons name="chevron-forward" size={20} color="#007bff" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    color: '#333',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryFee: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
});

export default StoreCard;