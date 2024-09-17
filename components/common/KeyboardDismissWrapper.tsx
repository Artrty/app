import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback } from 'react';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export function KeyBoardDismissWrapper({ children }: Props) {
  const dismissKeyboard = useCallback(() => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  }, []);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => dismissKeyboard()}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
