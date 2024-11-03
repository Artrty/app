import { StyleSheet, Text, View } from 'react-native';
export function MainHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>{'SPOTL'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    marginBottom: 4,
    width: '100%',
    flex: 1,
  },
  appName: {
    fontSize: 40,
  },
});
