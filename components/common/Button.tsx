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
export function Button({
  title,
  style,
  onPress,
  disabled,
}: Props & ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...style,
        backgroundColor: disabled ? 'lightgrey' : '#007AFF',
      }}
      onPress={(e) => {
        if (!disabled) {
          onPress && onPress(e);
        }
      }}
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
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'condensedBold',
    color: 'white',
  },
});
