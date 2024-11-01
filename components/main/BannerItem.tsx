import { StyleSheet, Dimensions, View } from 'react-native';
import { Image } from 'expo-image';
interface IBannerItemsProps {
  item: {
    src: string;
  };
}

export function BannerItem({ item }: IBannerItemsProps) {
  console.log(item);
  return <Image style={styles.container} source={item} />;
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 200,
    backgroundColor: 'grey',
  },
});
