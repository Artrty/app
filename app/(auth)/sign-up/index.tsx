import { View, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { router } from 'expo-router';
import {
  Controller,
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';

import TitledTextInput from '@/components/auth/TitledTextInput';
import { Button } from '@/components/common/Button';
import { HeaderLeadingPage } from '@/components/template/HeaderLeadingPage';
import { KeyBoardDismissWrapper } from '@/components/template/KeyboardDismissWrapper';
import { KeyboardAvoidingWithHeader } from '@/components/template/KeyboardAvoidingWithHeader';
import { StageInfo, IStageInfoType, FormId } from './StageInfo';

type FormData = {
  [key in (typeof StageInfo)[number]['id']]: string;
};

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});
  const [stage, setStage] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);

  const onSubmitSuccess: SubmitHandler<FormData> = useCallback((data) => {
    console.log('data', data);
    router.replace('/sign-up/complete');
  }, []);

  const onSubmitFail: SubmitErrorHandler<FormData> = useCallback((error) => {
    console.log('error', error);
  }, []);
  const renderInputs = useCallback(
    (info: (typeof StageInfo)[number], index: number) => {
      return (
        <>
          {stage > index - 1 && (
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TitledTextInput
                  readOnly={stage !== index && currentTitle !== index}
                  onFocus={() => setCurrentTitle(index)}
                  sideButtonProps={
                    info.id === 'code'
                      ? {
                          title: '재전송',
                          onPress: (text) => console.log(text),
                        }
                      : undefined
                  }
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  {...info.inputProps}
                />
              )}
              name={info.id}
            ></Controller>
          )}
        </>
      );
    },
    [currentTitle, stage, control]
  );

  return (
    <KeyboardAvoidingWithHeader>
      <KeyBoardDismissWrapper>
        <View style={styles.container}>
          <HeaderLeadingPage
            title={StageInfo[stage].title}
            subTitle={StageInfo[stage].subTitle}
          >
            <>{StageInfo.map((v, i) => renderInputs(v, i)).reverse()}</>
          </HeaderLeadingPage>
          <Button
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
