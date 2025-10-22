import React from 'react';
import { View, Text, ScrollView } from 'react-native';
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
    <View className="flex-1 bg-light-gray">
      <Header title="الملف الشخصي" />
      <ScrollView className="flex-1 p-4">
        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-lg font-bold mb-4 text-gray-800">معلومات الحساب</Text>
          
          <View className="flex-row justify-between py-2 border-b border-gray-200">
            <Text className="text-base text-gray-600">رقم الهاتف</Text>
            <Text className="text-base font-semibold text-gray-800">{user?.phone || 'غير متوفر'}</Text>
          </View>
          
          <View className="flex-row justify-between py-2 border-b border-gray-200">
            <Text className="text-base text-gray-600">الاسم</Text>
            <Text className="text-base font-semibold text-gray-800">الزائر</Text>
          </View>
        </View>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm shadow-gray-300">
          <Text className="text-lg font-bold mb-4 text-gray-800">الإعدادات</Text>
          
          <View className="flex-row justify-between py-3 border-b border-gray-200">
            <Text className="text-base text-gray-800">اللغة</Text>
            <Text className="text-base text-gray-600">العربية</Text>
          </View>
          
          <View className="flex-row justify-between py-3 border-b border-gray-200">
            <Text className="text-base text-gray-800">إشعارات</Text>
            <Text className="text-base text-gray-600">مفعل</Text>
          </View>
        </View>

        <View className="mt-4">
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