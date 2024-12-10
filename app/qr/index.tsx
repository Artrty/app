import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [qrId, setQrId] = useState(-1);
  const userData = [
    {
      name: '심관우',
      showTitle: '강남대학교 축제',
      phonenumber: '010-5438-1439',
      reservatedDate: '11/27',
      verified: true,
    },
    {
      name: '노차희',
      showTitle: '2024-2 시내터 연말공연',
      phonenumber: '010-1533-9985',
      reservatedDate: '11/29',
      verified: true,
    },
    {
      name: '이태규',
      showTitle: '유니버셜아트디자인 졸업전시회',
      phonenumber: '010-4757-4218',
      reservatedDate: '11/30',
      verified: false,
    },
  ];

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={(result) => {
          console.log(result.data);
          if (Number(result.data.length) > -1) {
            setQrId(Number(result.data));
          }
        }}
      >
        <View style={styles.qrContainer}>
          <View style={styles.qrBox}></View>
          {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View> */}
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                }}
              >
                {'예약자 정보'}
              </Text>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: 'grey' }}>
                {userData[qrId] && userData[qrId].verified
                  ? '입금완료'
                  : '입금미완료'}
              </Text>
              {userData[qrId] && userData[qrId].verified ? (
                <Octicons name='verified' size={24} color='green' />
              ) : (
                <Octicons name='unverified' size={24} color='red' />
              )}
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text>{'공연명'}</Text>
            <Text style={styles.infoName}>
              {userData[qrId] && userData[qrId].showTitle}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text>{'이름'}</Text>
            <Text style={styles.infoName}>
              {userData[qrId] && userData[qrId].name}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text>{'전화번호'}</Text>
            <Text style={styles.infoPhonenumber}>
              {userData[qrId] && userData[qrId].phonenumber}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text>{'예약일자'}</Text>
            <Text style={styles.infoDate}>
              {userData[qrId] && userData[qrId].reservatedDate}
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  infoName: {
    fontSize: 20,
  },
  infoPhonenumber: {
    fontSize: 20,
  },
  infoDate: {
    fontSize: 20,
  },
  infoVerified: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  qrContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  qrBox: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: 'red',
    width: 200,
    height: 200,
  },
  infoContainer: {
    backgroundColor: 'white',
    width: '100%',
    flex: 2,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  rowContainer: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
});
