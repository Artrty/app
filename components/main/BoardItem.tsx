import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

interface Event {
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
  precautions: string;
  eventInfoLink: string;
  postWriter: string;
  eventPosterUrl: string;
  postTime: string;
  eventAddress: string;
  id: string;
}

interface PBoardItem {
  event: Event;
}
export const BoardItem = ({ event }: PBoardItem) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getDate()}월 ${date.getDay()}일`;
  };
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/detail',
          params: {
            id: event.id,
          },
        })
      }
    >
      <View style={styles.container}>
        <Image
          source={event.eventPosterUrl}
          style={styles.poster}
          blurRadius={8}
        />
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <Text style={styles.title}>{event.eventTitle}</Text>
            <Text style={styles.location}>{event.eventLocation}</Text>
            <Text style={styles.date}>{formatDate(event.postTime)}</Text>
          </View>
          <Text style={styles.description} numberOfLines={3}>
            {event.eventDescription}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  contentContainer: {
    flex: 1,
    gap: 8,
    padding: 8,
  },
  poster: {
    width: 100,
    height: 160,
    backgroundColor: 'grey',
  },
  topContent: {
    flex: 0,
    gap: 4,
  },

  title: {
    fontSize: 20,
  },

  location: {
    color: 'grey',
  },

  date: {
    color: 'grey',
  },
  description: {
    color: '#000000',
  },
});
