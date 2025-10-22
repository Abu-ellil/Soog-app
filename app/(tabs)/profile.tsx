import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import Header from '../../components/Header';
import Button from '../../components/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Header title="الملف الشخصي" />
      <ScrollView style={styles.content}>
        <View style={styles.profileInfo}>
          <Text style={styles.sectionTitle}>معلومات الحساب</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>رقم الهاتف</Text>
            <Text style={styles.value}>{user?.phone || 'غير متوفر'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>الاسم</Text>
            <Text style={styles.value}>الزائر</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإعدادات</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>اللغة</Text>
            <Text style={styles.settingValue}>العربية</Text>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>إشعارات</Text>
            <Text style={styles.settingValue}>مفعل</Text>
          </View>
        </View>

        <View style={styles.logoutButton}>
          <Button
            title="تسجيل الخروج"
            onPress={handleLogout}
            variant="danger"
            fullWidth
          />
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
  profileInfo: {
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
 },
  settingValue: {
    fontSize: 16,
    color: '#66',
  },
  logoutButton: {
    marginTop: 16,
  },
});