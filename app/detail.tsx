import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/common/Button';
import { useEffect, useState } from 'react';
import api from '@/api';
import { ResEvent } from '@/api/event';

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const [event, setEvent] = useState<ResEvent>();

  useEffect(() => {
    console.log('calling event detail');
    api.event.getEvent(params.id, {
      onSuccess: (res) => {
        console.log('detail event', res.data.data.eventBoard);
        setEvent(res.data.data.eventBoard);
      },
      onError: () => {
        console.log('error');
      },
    });
  }, [params.id]);

  return (
    <SafeAreaView
      style={{ flex: 1, overflow: 'visible', backgroundColor: 'transparent' }}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <Image
            blurRadius={8}
            src={event?.eventPosterUrl}
            style={styles.headerImage}
          />
        }
      >
        <View style={styles.container}>
          <Image src={event?.eventPosterUrl} style={styles.poster} />
          <View style={styles.infoContainer}>
            <Text style={{ fontSize: 28 }}>{event?.eventTitle}</Text>
            <Text style={{ fontSize: 18 }}>{event?.eventLocation}</Text>
            <Text style={{ fontSize: 18 }}>{event?.eventDate}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={{ fontSize: 26 }}>{'공연 내용'}</Text>
            <Text style={{ fontSize: 18 }}>{event?.eventDescription}</Text>
          </View>
        </View>
      </ParallaxScrollView>
      <Button style={styles.applyButton} title='공연 신청하기' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 1000,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  blurContainer: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
  },
  infoContainer: {
    flex: 0,
    gap: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingHorizontal: 12,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: '#00000010',
    paddingHorizontal: 12,
  },
  poster: {
    width: 110,
    height: 160,
    objectFit: 'cover',
    position: 'absolute',
    top: -120,
    left: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
  },
  headerImage: {
    width: '100%',
    height: '120%',
    objectFit: 'cover',
    overflow: 'visible',
  },
  applyButton: {},
});
