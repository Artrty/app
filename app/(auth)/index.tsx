import {
  View,
  Text,
  TextInput,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidingView}
    >
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.form}>
            <Text>Artrty</Text>
            <View style={styles.inputs}>
              <Link href='/sign-up'>{'회원가입'}</Link>
            </View>
            <Button
              title='로그인'
              onPress={(e) => {
                console.log('login button pressed');
              }}
            />
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
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
  inputs: {
    width: '100%',
  },
  form: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
