import { RoundedButton } from '@/components/common/RoundedButton';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SignUpCompleteScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>회원가입을 완료했어요</Text>
      </View>
      <Animated.View
        entering={FadeIn.delay(1000)}
        style={{ marginTop: 'auto' }}
      >
        <RoundedButton title='시작' />
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
