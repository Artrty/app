import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import 'react-native-reanimated';

export default function SignUpStack() {
  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name='index' options={{ headerTitle: '' }} />
        <Stack.Screen
          name='complete'
          options={{ headerShown: false, animation: 'fade' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
