import { View, StyleSheet } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import TitledTextInput from '@/components/auth/TitledTextInput';
import { Button } from '@/components/common/Button';
import { HeaderLeadingPage } from '@/components/template/HeaderLeadingPage';
import { KeyBoardDismissWrapper } from '@/components/template/KeyboardDismissWrapper';
import { KeyboardAvoidingWithHeader } from '@/components/template/KeyboardAvoidingWithHeader';
import { StageInfo } from './StageInfo';

type FormData = {
  [key in (typeof StageInfo)[number]['id']]: string;
};

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    getFieldState,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      phonenumber: '',
      code: '',
      password: '',
      passwordRepeat: '',
    },
  });
  const [stage, setStage] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);

  const onSubmitSuccess: SubmitHandler<FormData> = useCallback((data) => {
    console.log('data', data);
    router.replace('/sign-up/complete');
  }, []);

  const onSubmitFail: SubmitErrorHandler<FormData> = useCallback((error) => {
    console.log('error', error);
  }, []);

  const renderUsernameInput = useCallback(
    (data: typeof StageInfo, stage: number, currentTitle: number) => {
      const index = 0;
      const info = data[index];
      return (
        stage > index - 1 && (
          <TitledTextInput
            key={info.id}
            name={info.id}
            control={control}
            rules={info.rules}
            textInputProps={{
              readOnly: stage !== index && currentTitle !== index,
              onFocus: () => setCurrentTitle(index),

              ...info.inputProps,
            }}
          />
        )
      );
    },
    [control]
  );

  const renderPhonenumberInput = useCallback(
    (data: typeof StageInfo, stage: number, currentTitle: number) => {
      const index = 1;
      const info = data[index];
      return (
        stage > index - 1 && (
          <TitledTextInput
            key={info.id}
            name={info.id}
            control={control}
            rules={info.rules}
            textInputProps={{
              readOnly: stage !== index && currentTitle !== index,
              onFocus: () => setCurrentTitle(index),
              ...info.inputProps,
            }}
          />
        )
      );
    },
    [control]
  );

  const renderCodeInput = useCallback(
    (data: typeof StageInfo, stage: number, currentTitle: number) => {
      const index = 2;
      const info = data[index];
      return (
        stage > index - 1 && (
          <TitledTextInput
            key={info.id}
            name={info.id}
            control={control}
            rules={info.rules}
            textInputProps={{
              readOnly: stage !== index && currentTitle !== index,
              onFocus: () => setCurrentTitle(index),
              sideButtonProps: {
                title: '재전송',
                onPress: (text) => console.log(text),
              },
              ...info.inputProps,
            }}
          />
        )
      );
    },
    [control]
  );

  const renderPasswordInput = useCallback(
    (data: typeof StageInfo, stage: number, currentTitle: number) => {
      const index = 3;
      const info = data[index];
      return (
        stage > index - 1 && (
          <TitledTextInput
            key={info.id}
            name={info.id}
            control={control}
            rules={info.rules}
            textInputProps={{
              onFocus: () => {
                setStage(index);
                setCurrentTitle(index);
              },
              ...info.inputProps,
            }}
          />
        )
      );
    },
    [control]
  );

  const renderPasswordReInput = useCallback(
    (data: typeof StageInfo, stage: number, currentTitle: number) => {
      const index = 4;
      const info = data[index];
      return (
        stage === index && (
          <TitledTextInput
            key={info.id}
            name={info.id}
            control={control}
            rules={{
              validate: (value, formValues) =>
                value === formValues.password ||
                '비밀번호가 일치하지 않습니다.',
              ...info.rules,
            }}
            textInputProps={{
              readOnly: stage !== index && currentTitle !== index,
              onFocus: () => setCurrentTitle(index),

              ...info.inputProps,
            }}
          />
        )
      );
    },
    [control]
  );

  // const renderInputs = useCallback(
  //   (info: (typeof StageInfo)[number], index: number) => {
  //     return (
  //       stage > index - 1 && (
  //         <TitledTextInput
  //           key={info.id}
  //           name={info.id}
  //           control={control}
  //           rules={
  //             info.id === 'passwordRepeat'
  //               ? {
  //                   validate: (value, formValues) =>
  //                     value === formValues.password ||
  //                     '비밀번호가 일치하지 않습니다.',
  //                   ...info.rules,
  //                 }
  //               : info.rules
  //           }
  //           textInputProps={{
  //             readOnly: stage !== index && currentTitle !== index,
  //             onFocus: () => setCurrentTitle(index),
  //             sideButtonProps:
  //               info.id === 'code'
  //                 ? {
  //                     title: '재전송',
  //                     onPress: (text) => console.log(text),
  //                   }
  //                 : undefined,
  //             ...info.inputProps,
  //           }}
  //         />
  //       )
  //     );
  //   },
  //   [currentTitle, stage, control]
  // );

  return (
    <KeyboardAvoidingWithHeader>
      <KeyBoardDismissWrapper>
        <View style={styles.container}>
          <HeaderLeadingPage
            title={StageInfo[stage].title}
            subTitle={StageInfo[stage].subTitle}
          >
            {/* {StageInfo.map((v, i) => renderInputs(v, i)).reverse()} */}
            {renderPasswordReInput(StageInfo, stage, currentTitle)}
            {renderPasswordInput(StageInfo, stage, currentTitle)}
            {renderCodeInput(StageInfo, stage, currentTitle)}
            {renderPhonenumberInput(StageInfo, stage, currentTitle)}
            {renderUsernameInput(StageInfo, stage, currentTitle)}
          </HeaderLeadingPage>
          <Button
            disabled={
              !getFieldState(StageInfo[stage].id).isDirty ||
              getFieldState(StageInfo[stage].id).invalid
            }
            style={styles.submit}
            title={stage === StageInfo.length - 1 ? '회원가입' : '확인'}
            onPress={() =>
              stage === StageInfo.length - 1
                ? handleSubmit(onSubmitSuccess, onSubmitFail)()
                : setStage((prev) => prev + 1)
            }
          />
        </View>
      </KeyBoardDismissWrapper>
    </KeyboardAvoidingWithHeader>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  submit: {
    marginTop: 'auto',
  },
});
