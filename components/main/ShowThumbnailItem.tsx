import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Shadow } from 'react-native-shadow-2';
import { useCallback } from 'react';
import { router } from 'expo-router';
interface IThumbnailItemProps {
  item: {
    src: string;
  };
}
export function ShowThumbnailItem({ item }: IThumbnailItemProps) {
  const onThumbnailClicked = useCallback(() => {
    console.log(item);
    router.push({
      pathname: '/detail',
      params: item,
    });
  }, [item]);

  return (
    <Shadow startColor='#00000050' distance={3} offset={[0, 2]}>
      <TouchableOpacity onPress={onThumbnailClicked}>
        <Image style={styles.container} source={item}></Image>
      </TouchableOpacity>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 210,
    height: 280,
  },
});
