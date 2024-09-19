import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function SignUpStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: '' }} />
      <Stack.Screen
        name='complete'
        options={{ headerShown: false, animation: 'fade' }}
      />
    </Stack>
  );
}
