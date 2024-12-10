import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import axios from '@/lib/axios';

import TitledTextInput from '@/components/auth/TitledTextInput';
import { Button } from '@/components/common/Button';
import { HeaderLeadingPage } from '@/components/template/HeaderLeadingPage';
import { KeyBoardDismissWrapper } from '@/components/template/KeyboardDismissWrapper';
import { KeyboardAvoidingWithHeader } from '@/components/template/KeyboardAvoidingWithHeader';
import { SignInStageInfo, SignUpStageInfo } from '../../../constants/StageInfo';

import API from '@/api';

import { useAuthStore } from '@/store/auth/useAuthStore';

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
    setError,
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
  const [isLoading, setIsLoading] = useState(false);

  const { setToken, login } = useAuthStore();

  useEffect(() => {
    setStageInfo(isSignUpMode ? SignUpStageInfo : SignInStageInfo);
  }, [isSignUpMode]);

  const changeForm = useCallback(async () => {
    setIsLoading(true);
    switch (stageInfo[stage].id) {
      case 'phonenumber':
        console.log('isUser checking...');
        await API.user.isUser(getValues().phonenumber, {
          onSuccess: (data) => {
            console.log('isUser', data);
            setIsSignUpMode(!data.data.data.exists);
            setIsLoading(false);
            setStage((prev) => prev + 1);
            // if (!data.data.data.exists) {
            //   // user is not a member
            //   // sending verification code
            //   console.log('sending code...');
            //   API.auth.sendCodeTo(getValues().phonenumber, {
            //     onSuccess: (data) => {
            //       console.log('code sent', data);
            //     },
            //   });
            // }
          },
          onError: (e) => {
            switch (e.response?.data.code) {
              case 'U504':
                // user is not a member
                // sending verification code
                console.log('sending code...');
                API.auth.sendCodeTo(getValues().phonenumber, {
                  onSuccess: (data) => {
                    console.log('code sent', data);
                    setIsLoading(false);
                    setStage((prev) => prev + 1);
                  },
                });
                break;
              default:
                setError('phonenumber', {
                  type: 'error',
                  message: '오류가 발생했습니다. 다시 시도해주세요.',
                });
                setIsLoading(false);
            }
          },
        });

        break;
      case 'code':
        API.auth.verifyCode(
          {
            phonenumber: getValues().phonenumber,
            code: getValues().code,
          },
          {
            onSuccess: (data) => {
              console.log('verifyCode success', data);
              setIsLoading(false);
              setStage((prev) => prev + 1);
            },
            onClientError: (e) => {
              // if wrong code
            },
            onServerError: (e) => {},
          }
        );
        break;
      default:
        setStage((prev) => prev + 1);
        setIsLoading(false);
    }
  }, [getValues, stage, stageInfo, setError]);

  const onSubmitSuccess: SubmitHandler<FormData> = useCallback(
    async (form) => {
      setIsLoading(true);
      console.log('form', form);
      if (isSignUpMode) {
        API.auth.signUp(
          {
            username: form.username,
            phonenumber: form.phonenumber,
            password: form.password,
          },
          {
            onSuccess() {
              setIsLoading(false);
              router.replace({
                pathname: '/sign-up/complete',
                params: {
                  mode: 'sign-up',
                },
              });
            },
          }
        );
      } else {
        API.auth.signIn(
          {
            phonenumber: form.phonenumber,
            password: form.password,
          },
          {
            onSuccess(data) {
              setIsLoading(false);
              switch (data.data.code) {
                case 'U002': // login success
                  console.log('login success', data);
                  const token = data.data.data.authResponse.token;
                  setToken(token);
                  login();
                  router.replace({
                    pathname: '/sign-up/complete',
                    params: {
                      mode: 'sign-in',
                    },
                  });
                  break;
                case 'U003': // password incorrect
                  setError('password', {
                    type: 'wrong',
                    message: '비밀번호가 일치하지 않습니다',
                  });
              }
            },
          }
        );
      }
    },
    [isSignUpMode, login, setToken]
  );

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
    <SafeAreaView style={{ flex: 1 }}>
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
              isLoading={isLoading}
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
    </SafeAreaView>
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
