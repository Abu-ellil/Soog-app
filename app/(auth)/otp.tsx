import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
    <View style={styles.container}>
      <Header title="توصيلة" showBackButton />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>رمز التحقق</Text>
          <Text style={styles.subtitle}>تم إرسال رمز التحقق إلى {phone}</Text>
          
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
          
          <Text style={styles.hintText}>
            ملاحظة: في هذا الإصدار التجريبي، استخدم الرمز 123456
          </Text>
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
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  hintText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});