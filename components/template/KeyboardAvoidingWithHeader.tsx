import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import React from 'react';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export function KeyboardAvoidingWithHeader({ children }: Props) {
  const offset = useHeaderHeight() + StatusBar.currentHeight!;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={offset}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
