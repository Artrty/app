import {
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { useState, useEffect } from 'react';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import {
  useController,
  FieldValues,
  FieldPath,
  RegisterOptions,
  Control,
} from 'react-hook-form';

export interface TInputProps extends TextInputProps {
  title: string;
  filterRule?: RegExp;
}
interface IProps<T extends FieldValues> {
  textInputProps: TInputProps;
  name: FieldPath<T>;
  control: Control<T>;
  rules?: RegisterOptions;
}

export default function OutlinedTextInput<
  TFieldValues extends FieldValues = FieldValues,
>({ textInputProps, ...props }: IProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    ...props,
    rules: props.rules as RegisterOptions<TFieldValues>,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  return (
    <Animated.View layout={LinearTransition} style={styles.container}>
      <Animated.View
        layout={LinearTransition}
        style={{
          ...styles.TInputContainer,
          borderBottomColor: isFocused ? '#007AFF' : 'lightgrey',
        }}
      >
        <>
          <Animated.Text
            entering={FadeIn}
            style={{
              ...styles.title,
              color: isFocused ? '#007AFF' : 'grey',
            }}
          >
            {textInputProps.title}
          </Animated.Text>
        </>
        <View style={styles.rowContainer}>
          <TextInput
            autoCapitalize='none'
            spellCheck={false}
            autoCorrect={false}
            id={field.name}
            style={styles.input}
            selectionColor='rgb(30, 108, 219)'
            placeholderTextColor='lightgrey'
            readOnly={textInputProps.readOnly}
            {...textInputProps}
            onFocus={(e) => {
              setIsFocused(true);
              textInputProps.onFocus && textInputProps.onFocus(e);
            }}
            onBlur={() => {
              setIsFocused(false);
              field.onBlur();
            }}
            onChangeText={(text) => {
              const result = textInputProps.filterRule
                ? text.replace(textInputProps.filterRule, '')
                : text;
              field.onChange(result);
              setText(result);
            }}
            value={field.value}
            ref={field.ref}
          />
        </View>
      </Animated.View>
      <>
        {error?.message && error?.message !== '' && (
          <Animated.Text layout={LinearTransition} style={styles.errorMessage}>
            {error.message}
          </Animated.Text>
        )}
      </>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  TInputContainer: {
    width: '100%',
    // height: 54,
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
    fontSize: 18,

    paddingVertical: 6,
    fontWeight: 300,
  },
  errorMessage: {
    color: 'grey',
    fontSize: 14,
    marginTop: 4,
    height: 16,
  },
});
