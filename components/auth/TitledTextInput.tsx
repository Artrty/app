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
  UseControllerProps,
} from 'react-hook-form';

export interface TInputProps extends TextInputProps {
  title: string;
  sideButtonProps?: {
    title: string;
    onPress: (value: string) => void;
  };
  filterRule?: RegExp;
}
interface IProps {
  textInputProps: TInputProps;
}

export default function TitledTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  textInputProps,
  ...props
}: IProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({ ...props });
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
          {text.length > 0 && (
            <Animated.Text
              entering={FadeIn}
              style={{
                ...styles.title,
                color: isFocused
                  ? '#007AFF'
                  : textInputProps.readOnly
                    ? 'lightgrey'
                    : 'grey',
              }}
            >
              {textInputProps.title}
            </Animated.Text>
          )}
        </>
        <View style={styles.rowContainer}>
          <TextInput
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
          {textInputProps.sideButtonProps && (
            <Button
              disabled={textInputProps.readOnly}
              title={textInputProps.sideButtonProps!.title}
              onPress={() => textInputProps.sideButtonProps!.onPress(text)}
            />
          )}
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
  errorMessage: {
    color: 'grey',
    fontSize: 14,
    marginTop: 4,
    height: 16,
  },
});
