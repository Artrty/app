import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HeaderTitle } from '@/components/common/HeaderTitle';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <HeaderTitle>{'내 정보'}</HeaderTitle>
          <Text style={styles.title}>
            <Text style={styles.username}>{'이태규 '}</Text>님 안녕하세요
          </Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuContent}
              onPress={() => router.push('/create')}
            >
              <MaterialIcons name='create' size={28} />
              <Text style={styles.menuLabel}>공연 생성</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContent}>
              <MaterialIcons name='qr-code-scanner' size={28} color='black' />
              <Text style={styles.menuLabel}>QR 스캔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContent}>
              <MaterialIcons name='confirmation-num' size={28} color='black' />
              <Text style={styles.menuLabel}>티켓 생성</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.showInfoContainer}>
          <View style={styles.showInfoContent}>
            <Text style={styles.showInfoNumber}>12</Text>
            <Text style={styles.showInfoLabel}>관람예정 공연</Text>
          </View>
          <View style={styles.showInfoContent}>
            <Text style={styles.showInfoNumber}>3</Text>
            <Text style={styles.showInfoLabel}>주최한 공연</Text>
          </View>
        </View>
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  userInfoContainer: {
    flex: 0,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    paddingLeft: 4,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 0,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 20,
    gap: 12,
  },
  menuContent: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#00000010',
    borderRadius: 20,
    paddingVertical: 8,
  },
  menuLabel: {
    fontSize: 16,
  },
  showInfoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  showInfoContent: {
    flex: 1,
    alignItems: 'center',
  },
  showInfoNumber: {
    fontSize: 20,
    fontWeight: 700,
  },
  showInfoLabel: {
    fontSize: 16,
    color: '#00000090',
  },
});
