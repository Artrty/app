import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const session = false;
  const [loaded] = useFonts({
    Pretendard: require('../assets/fonts/Pretendard-Regular.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // check if user has authenticated
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style='dark' />
      {/* <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider> */}
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen
          name='tabs'
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen name='detail' options={{ headerShown: false }} />
        <Stack.Screen name='create' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
      {/* </BottomSheetModalProvider>
      </GestureHandlerRootView> */}
    </ThemeProvider>
  );
}
