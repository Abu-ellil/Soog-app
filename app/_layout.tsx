import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/otp" options={{ headerShown: false }} />
            <Stack.Screen name="(store)/[storeId]" options={{ headerShown: false }} />
            <Stack.Screen name="(cart)/index" options={{ headerShown: false }} />
            <Stack.Screen name="(orders)/[orderId]" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}