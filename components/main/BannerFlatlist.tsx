import { FlatList, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { BannerItem } from './BannerItem';

interface IFlatlistProps {
  items: [string];
}

export function BannerFlatlist({ items }: IFlatlistProps) {
  const renderBannerItem = useCallback(
    ({ item }) => <BannerItem item={item} />,
    []
  );

  return (
    <FlatList
      style={styles.container}
      data={items}
      renderItem={renderBannerItem}
      horizontal
      decelerationRate='fast'
      pagingEnabled
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
