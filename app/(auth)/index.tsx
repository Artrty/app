import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useCallback, useEffect } from 'react';
import { Link, router } from 'expo-router';

import TitledTextInput from '@/components/auth/TitledTextInput';
import { Button } from '@/components/common/Button';

export default function LoginScreen() {
  const { isLoggedIn, login, setToken } = useAuthStore();

  const onSubmit = useCallback(() => {
    // request login
    // if success
    const token = '';
    login();
    setToken(token);
    router.replace('/');
  }, []);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.appName}>SPOTL</Text>
        <Button
          title='로그인 / 회원가입'
          onPress={(e) => {
            router.push('/sign-up');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },

  appName: {
    fontSize: 30,
  },
});
