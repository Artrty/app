import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/common/Button';

export default function CreatePostScreen() {
  return <View style={styles.container}></View>;
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
