import {
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { useState } from 'react';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';

export interface IProps extends TextInputProps {
  title: string;
  sideButtonProps?: {
    title: string;
    onPress: (value: string) => void;
  };
  filterRule?: RegExp;
}
export default function TitledTextInput({
  title,
  sideButtonProps,
  onFocus,
  filterRule,
  readOnly,
  ...props
}: IProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  return (
    <Animated.View
      layout={LinearTransition}
      style={{
        ...styles.container,
        borderBottomColor: isFocused ? '#007AFF' : 'lightgrey',
      }}
    >
      {text.length > 0 && (
        <Animated.Text
          entering={FadeIn}
          style={{
            ...styles.title,
            color: isFocused ? '#007AFF' : 'grey',
          }}
        >
          {title}
        </Animated.Text>
      )}
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.input}
          selectionColor='rgb(30, 108, 219)'
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholderTextColor='lightgrey'
          value={text}
          onChangeText={(text) =>
            filterRule ? setText(text.replace(filterRule, '')) : setText(text)
          }
          readOnly={readOnly}
          {...props}
        />
        {sideButtonProps && (
          <Button
            disabled={readOnly}
            title={sideButtonProps!.title}
            onPress={() => sideButtonProps!.onPress(text)}
          />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    height: 54,
    borderColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 'auto',
  },
  title: {
    fontSize: 14,
    color: 'grey',
    paddingLeft: 2,
    fontWeight: 600,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 21,

    paddingVertical: 6,
    fontWeight: 300,
  },
  button: {},
  inputFocused: {},
});
