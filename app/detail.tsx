import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/common/Button';

export default function DetailScreen() {
  const image = useLocalSearchParams();
  console.log(image);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/music/1.jpeg')}
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 28 }}>CHAMBER MUSIC PROJECT</Text>
        <Text style={{ fontSize: 18 }}>기흥구 구갈동 영산아트홀</Text>
        <Text style={{ fontSize: 18 }}>2020. 8. 19</Text>
        <Text style={{ fontSize: 15 }}>
          공연 설명입니다. 공연 설명입니다. 공연 설명입니다. 공연 설명입니다.
        </Text>
        <Button title='공연 신청하기' />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 1000,
    backgroundColor: 'white',
    padding: 10,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
});
