import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../lib/api';

export default function WelcomeScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSendOTP = async () => {
    if (!phone) {
      alert('الرجاء إدخال رقم الهاتف');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call to send OTP
      // For demo purposes, we'll simulate an immediate response
      const response = await api.post('/auth/request-otp', { phone });
      
      // For the demo, we'll directly navigate to OTP screen
      router.push({
        pathname: '/(auth)/otp',
        params: { phone, otp: '123456' } // In real app, OTP would be sent via SMS
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('حدث خطأ أثناء إرسال رمز التحقق');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-light-gray">
      <Header title="توصيلة" />
      <ScrollView contentContainerClassName="flex-grow p-4">
        <View className="flex-1 justify-center">
          <Text className="text-2xl font-bold text-center mb-2 text-gray-800">مرحباً بك في توصيلة</Text>
          <Text className="text-base text-center mb-8 text-gray-600">الرجاء إدخال رقم هاتفك للبدء</Text>
          
          <Input
            label="رقم الهاتف"
            placeholder="أدخل رقم هاتفك"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          
          <Button
            title="إرسال رمز التحقق"
            onPress={handleSendOTP}
            loading={loading}
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}