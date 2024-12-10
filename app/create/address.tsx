import { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import api from '@/api';
import { ResGetAddress } from '@/api/naver-map';
import { router } from 'expo-router';

export default function AddressSearchScreen() {
  const [query, setQuery] = useState('');
  const [addressList, setAddressList] = useState<ResGetAddress[]>([]);

  useEffect(() => {
    api.naverMap.getAddress(query, {
      onSuccess: (res) => {
        console.log(res.data);
        setAddressList(res.data);
      },
    });
  }, [query]);

  const onAddressPressed = useCallback((address: string) => {
    router.replace({
      pathname: '/create',
      params: { address },
    });
  }, []);

  const renderAddressItem = useCallback(({ item }: { item: ResGetAddress }) => {
    const splitedTitle = item.title.replace('<b>', '').split('</b>');
    const pureTitle = item.title.replace('<b>', '').replace('</b>', '');
    return (
      <TouchableOpacity onPress={() => onAddressPressed(pureTitle)}>
        <View style={styles.addressContainer}>
          <Text style={{ fontSize: 20, marginBottom: 2 }}>
            {splitedTitle.map((v, i) => {
              if (i === 0) {
                return <Text style={{ fontWeight: 'bold' }}>{v}</Text>;
              } else {
                return <Text>{v}</Text>;
              }
            })}
          </Text>
          <Text>{item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder='검색어를 입력해주세요'
        placeholderTextColor={'#00000080'}
      />
      <FlatList
        style={{ flex: 1 }}
        data={addressList}
        renderItem={renderAddressItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize: 26,
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: 'lightgrey',
  },
  addressContainer: {
    flex: 1,
    padding: 12,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
});
