import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ButtonProps,
  ActivityIndicator,
} from 'react-native';

interface Props {
  title: string;
  style?: object;
  isLoading?: boolean;
}
export function Button({
  title,
  style,
  isLoading,
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
      {isLoading ? (
        <ActivityIndicator color='#FFFFFF' />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingTop: 1,
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
