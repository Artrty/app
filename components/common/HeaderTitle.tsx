import { Text, StyleSheet, TextProps } from 'react-native';

export function HeaderTitle({ children, ...props }: TextProps) {
  return (
    <Text {...props} style={styles.headerTitle}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 16,
  },
});
