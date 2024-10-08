import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ButtonProps,
  Keyboard,
} from 'react-native';

interface Props {
  title: string;
  style?: object;
}
export function RoundedButton({ title, style, onPress }: Props & ButtonProps) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingHorizontal: 6,
    marginHorizontal: 'auto',
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'condensedBold',
    color: 'white',
  },
});
