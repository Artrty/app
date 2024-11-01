import { Text, TextProps } from 'react-native';
import React from 'react';

export function Label({ ...props }: TextProps) {
  return (
    <Text {...props} style={{ fontFamily: 'Pretendard' }}>
      {props.children}
    </Text>
  );
}
