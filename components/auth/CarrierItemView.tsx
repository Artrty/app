import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

interface Props {
  verifyWith: (code: string) => void;
}
export default function VerifyCodeView({ verifyWith }: Props) {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => selectTitle(title)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
});
