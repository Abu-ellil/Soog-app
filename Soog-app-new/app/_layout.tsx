import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import '../global.css';

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </Provider>
  );
}
