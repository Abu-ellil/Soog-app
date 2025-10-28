import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../lib/api';

export default function OtpScreen() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { phone, otp: demoOtp } = useLocalSearchParams();
  const { login } = useAuth();

  const handleVerifyOTP = async () => {
    if (!otp) {
      alert('الرجاء إدخال رمز التحقق');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call to verify OTP
      // For demo purposes, we'll accept any OTP that matches the demo one
      if (otp === demoOtp) {
        // Simulate login success
        const mockUser = { id: '1', phone: phone };
        const mockToken = 'mock-jwt-token';
        
        login(mockUser, mockToken);
        
        // Navigate to home screen after successful login
        router.replace('/');
      } else {
        alert('رمز التحقق غير صحيح');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('حدث خطأ أثناء التحقق من الرمز');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-light-gray">
      <Header title="توصيلة" showBackButton />
      <ScrollView contentContainerClassName="flex-grow p-4">
        <View className="flex-1 justify-center">
          <Text className="text-2xl font-bold text-center mb-2 text-gray-80">رمز التحقق</Text>
          <Text className="text-base text-center mb-8 text-gray-600">تم إرسال رمز التحقق إلى {phone}</Text>
          
          <Input
            label="رمز التحقق"
            placeholder="أدخل الرمز"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          
          <Button
            title="تحقق من الرمز"
            onPress={handleVerifyOTP}
            loading={loading}
            fullWidth
          />
          
          <Text className="text-sm text-center mt-4 text-gray-500 italic">
            ملاحظة: في هذا الإصدار التجريبي، استخدم الرمز 123456
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}