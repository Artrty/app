import { View, StyleSheet } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import axios from '@/lib/axios';

import TitledTextInput from '@/components/auth/TitledTextInput';
import { Button } from '@/components/common/Button';
import { HeaderLeadingPage } from '@/components/template/HeaderLeadingPage';
import { KeyBoardDismissWrapper } from '@/components/template/KeyboardDismissWrapper';
import { KeyboardAvoidingWithHeader } from '@/components/template/KeyboardAvoidingWithHeader';
import { SignInStageInfo, SignUpStageInfo } from './StageInfo';

type FormData = {
  [key in (typeof SignUpStageInfo)[number]['id']]: string;
};

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    getFieldState,
    getValues,
    formState: { errors },
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
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [stageInfo, setStageInfo] = useState(SignUpStageInfo);

  useEffect(() => {
    setStageInfo(isSignUpMode ? SignUpStageInfo : SignInStageInfo);
  }, [isSignUpMode]);

  const changeForm = useCallback(async () => {
    if (stageInfo[stage].id === 'phonenumber') {
      const res = await axios.get(`/user/${getValues().phonenumber}/valid`);
      console.log('status', res);
      if (res.data.data === true) {
        // user is a member
        setIsSignUpMode(false);
      } else {
        // user is not a member
        setIsSignUpMode(true);
        // send verification code
        const res = await axios.get(
          `/auth/${getValues().phonenumber}/send-sms`
        );
        console.log(res.data);
      }
    } else if (stageInfo[stage].id === 'code') {
      const res = await axios.post(`/auth/verify-sms`, {
        phoneNumber: getValues().phonenumber,
        userVerifiedNumber: getValues().code,
      });
      console.log(res.data);
    }
    setStage((prev) => prev + 1);
  }, [getValues, stage, stageInfo]);

  const onSubmitSuccess: SubmitHandler<FormData> = useCallback(async (data) => {
    console.log('data', data);
    const res = await axios.post('/auth/signup', {
      userName: data.username,
      phoneNumber: data.phonenumber,
      password: data.password,
    });
    console.log(res);
    router.replace('/sign-up/complete');
  }, []);

  const onSubmitFail: SubmitErrorHandler<FormData> = useCallback((error) => {
    console.log('error', error);
  }, []);

  const renderUsernameInput = useCallback(
    (data: typeof stageInfo, stage: number, currentTitle: number) => {
      const index = 2;
      const info = data[index];
      return (
        <>
          {stage > index - 1 && (
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
          )}
        </>
      );
    },
    [control]
  );

  const renderPhonenumberInput = useCallback(
    (data: typeof stageInfo, stage: number, currentTitle: number) => {
      const index = 0;
      const info = data[index];
      return (
        <>
          {stage > index - 1 && (
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
          )}
        </>
      );
    },
    [control]
  );

  const renderCodeInput = useCallback(
    (data: typeof stageInfo, stage: number, currentTitle: number) => {
      const index = 1;
      const info = data[index];
      return (
        <>
          {stage > index - 1 && (
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
          )}
        </>
      );
    },
    [control]
  );

  const renderPasswordInput = useCallback(
    (data: typeof stageInfo, stage: number, currentTitle: number) => {
      const index = isSignUpMode ? 3 : 1;
      const info = data[index];
      return (
        <>
          {stage > index - 1 && (
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
          )}
        </>
      );
    },
    [control, isSignUpMode]
  );

  const renderPasswordReInput = useCallback(
    (data: typeof stageInfo, stage: number, currentTitle: number) => {
      const index = 4;
      const info = data[index];
      return (
        <>
          {stage === index && (
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
          )}
        </>
      );
    },
    [control]
  );

  // const renderInputs = useCallback(
  //   (info: (typeof stageInfo)[number], index: number) => {
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
            title={stageInfo[stage].title}
            subTitle={stageInfo[stage].subTitle}
          >
            {isSignUpMode &&
              renderPasswordReInput(stageInfo, stage, currentTitle)}
            {renderPasswordInput(stageInfo, stage, currentTitle)}
            {isSignUpMode &&
              renderUsernameInput(stageInfo, stage, currentTitle)}
            {isSignUpMode && renderCodeInput(stageInfo, stage, currentTitle)}
            {renderPhonenumberInput(stageInfo, stage, currentTitle)}
          </HeaderLeadingPage>
          <Button
            disabled={
              !getFieldState(stageInfo[stage].id).isDirty ||
              getFieldState(stageInfo[stage].id).invalid
            }
            style={styles.submit}
            title={
              stage === stageInfo.length - 1
                ? isSignUpMode
                  ? '회원가입'
                  : '로그인'
                : '확인'
            }
            onPress={() =>
              stage === stageInfo.length - 1
                ? handleSubmit(onSubmitSuccess, onSubmitFail)()
                : changeForm()
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
