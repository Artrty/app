import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import TitledTextInput from '@/components/auth/TitledTextInput';
import { Button } from '@/components/common/Button';
import { HeaderLeadingPage } from '@/components/template/HeaderLeadingPage';
import { router } from 'expo-router';
import { KeyBoardDismissWrapper } from '@/components/template/KeyboardDismissWrapper';
import { KeyboardAvoidingWithHeader } from '@/components/template/KeyboardAvoidingWithHeader';
export default function SignUpScreen() {
  const [stage, setStage] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = [
    '휴대폰 번호를 알려주세요',
    '인증번호를 입력해주세요',
    '설정할 비밀번호를 입력해주세요',
    '비밀번호를 다시 입력해주세요',
  ];
  const subTitles = [
    '공연 안내 및 공지사항 전송을 위해 필요해요',
    '인증번호 4자리를 문자로 전송했어요',
    '',
    '',
  ];

  return (
    <KeyboardAvoidingWithHeader>
      <KeyBoardDismissWrapper>
        <View style={styles.container}>
          <HeaderLeadingPage title={titles[stage]} subTitle={subTitles[stage]}>
            <>
              {stage > 2 && (
                <TitledTextInput
                  readOnly={stage !== 3 && currentTitle !== 3}
                  title={'비밀번호 재확인'}
                  placeholder='비밀번호 재확인'
                  inputMode='text'
                  secureTextEntry
                  filterRule={/\s/g}
                  autoFocus
                  onFocus={() => setCurrentTitle(3)}
                />
              )}
              {stage > 1 && (
                <TitledTextInput
                  readOnly={stage !== 2 && currentTitle !== 2}
                  title={'비밀번호'}
                  placeholder='비밀번호'
                  inputMode='text'
                  secureTextEntry
                  filterRule={/\s/g}
                  autoFocus
                  onFocus={() => setCurrentTitle(2)}
                />
              )}
              {stage > 0 && (
                <TitledTextInput
                  readOnly={stage !== 1 && currentTitle !== 1}
                  title={'인증번호'}
                  placeholder='인증번호'
                  inputMode='tel'
                  autoFocus
                  maxLength={4}
                  sideButtonProps={{
                    title: '재전송',
                    onPress: (text) => console.log(text),
                  }}
                  onFocus={() => setCurrentTitle(1)}
                />
              )}
              <TitledTextInput
                readOnly={stage !== 0 && currentTitle !== 0}
                title={'전화번호'}
                placeholder='전화번호'
                inputMode='tel'
                autoFocus
                maxLength={11}
              />
            </>
          </HeaderLeadingPage>
          <Button
            style={styles.submit}
            title={stage === 3 ? '회원가입' : '확인'}
            onPress={() =>
              stage === 3
                ? router.replace('/sign-up/complete')
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
