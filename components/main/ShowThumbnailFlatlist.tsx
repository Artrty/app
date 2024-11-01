import { FlatList, StyleSheet, View } from 'react-native';
import { useState, useCallback } from 'react';

import { ShowThumbnailItem } from './ShowThumbnailItem';

interface IFlatlistProps {
  items: [string];
}

export function ShowThumbnailFlatlist({ items }: IFlatlistProps) {
  const rendeThumbnailItem = useCallback(
    ({ item }) => <ShowThumbnailItem item={item} />,
    []
  );

  return (
    <FlatList
      style={styles.container}
      data={items}
      renderItem={rendeThumbnailItem}
      horizontal
      decelerationRate='fast'
      snapToOffsets={items.map((item, index) => index * 220)}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: 220,
        offset: 220 * index,
        index,
      })}
      contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
