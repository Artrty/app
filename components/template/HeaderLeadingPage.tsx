import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface Props {
  title: string;
  subTitle: string;
  children: React.ReactNode | React.ReactNode[];
}
export function HeaderLeadingPage({ title, subTitle, children }: Props) {
  return (
    <View style={styles.form}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
  },
  textContainer: {
    height: 120,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  subTitle: {
    color: 'grey',
    fontSize: 16,
  },
});
