import {
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import { HeaderNavbar } from '@/components/common/HeaderNavbar';
import { ShowThumbnailFlatlist } from '@/components/main/ShowThumbnailFlatlist';
import { BannerFlatlist } from '@/components/main/BannerFlatlist';
import { MainHeader } from '@/components/common/MainHeader';

export default function HomeScreen() {
  const musicImages = [
    require('@/assets/images/music/1.jpeg'),
    require('@/assets/images/music/2.jpeg'),
    require('@/assets/images/music/3.jpeg'),
    require('@/assets/images/music/4.jpeg'),
    require('@/assets/images/music/5.jpeg'),
  ];

  const exhibitionImages = [
    require('@/assets/images/exhibition/1.jpeg'),
    require('@/assets/images/exhibition/2.jpeg'),
    require('@/assets/images/exhibition/3.jpeg'),
    require('@/assets/images/exhibition/4.jpeg'),
    require('@/assets/images/exhibition/5.jpeg'),
  ];

  const theaterImages = [
    require('@/assets/images/theater/1.jpeg'),
    require('@/assets/images/theater/2.jpeg'),
    require('@/assets/images/theater/3.jpeg'),
    require('@/assets/images/theater/4.jpeg'),
    require('@/assets/images/theater/5.jpeg'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
        {/* header */}
        <MainHeader />
        <HeaderNavbar />
        {/* body */}
        <BannerFlatlist items={theaterImages} />
        <Text style={styles.contentTitle}>{'이번주 예정 공연'}</Text>
        <ShowThumbnailFlatlist items={musicImages} />
        <Text style={styles.contentTitle}>{'기흥구 주변의 공연'}</Text>
        <ShowThumbnailFlatlist items={exhibitionImages} />
        <View style={{ flex: 1, height: 10000 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentTitle: {
    fontSize: 22,
    paddingHorizontal: 14,
    marginTop: 16,
  },
});
