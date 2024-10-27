import { RoundedButton } from '@/components/common/RoundedButton';
import { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';

import { useAuthStore } from '@/store/auth/useAuthStore';
type QueryId = 'sign-in' | 'sign-up';

export default function SignUpCompleteScreen() {
  const { token } = useAuthStore();
  const { mode } = useLocalSearchParams<{ mode: QueryId }>();
  const modeToText = (mode: QueryId) => {
    if (mode === 'sign-in') return '로그인';
    else if (mode === 'sign-up') return '회원가입';
  };

  useEffect(() => {
    console.log(token);
  }, [token]);
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{`${modeToText(mode)}을 완료했어요`}</Text>
      </View>
      <Animated.View
        entering={FadeIn.delay(1000)}
        style={{ marginTop: 'auto' }}
      >
        <RoundedButton
          title='시작'
          onPress={() => {
            router.replace('/tabs');
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleView: {
    paddingTop: 142,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 31,
    fontWeight: 'bold',
  },
});
