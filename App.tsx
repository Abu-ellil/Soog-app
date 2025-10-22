import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from './lib/hooks/useAuth';

import './global.css';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login screen if not authenticated
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
