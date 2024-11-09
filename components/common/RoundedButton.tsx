import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ButtonProps,
  Keyboard,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  style: ViewStyle;
}
export function RoundedButton({
  title,
  style,
  onPress,
  disabled,
}: Props & ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        disabled ? styles.disabled : styles.active,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    maxHeight: 60,
    paddingHorizontal: 6,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  active: {
    backgroundColor: '#007AFF',
  },
  disabled: {
    backgroundColor: 'lightgrey',
  },
  title: {
    fontSize: 18,
    fontWeight: 'condensedBold',
    color: 'white',
  },
});
