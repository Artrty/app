import { TInputProps } from '@/components/auth/TitledTextInput';
import { RegisterOptions } from 'react-hook-form';

export type IStageInfoType = {
  id: 'username' | 'phonenumber' | 'code' | 'password' | 'passwordRepeat';
  title: string;
  subTitle: string;
  inputProps: TInputProps;
  rules: RegisterOptions<any> | undefined;
};

export const SignInStageInfo: IStageInfoType[] = [
  {
    id: 'phonenumber',
    title: '휴대폰 번호를 알려주세요',
    subTitle: '',
    inputProps: {
      title: '전화번호',
      placeholder: '전화번호',
      inputMode: 'tel',
      autoFocus: true,
      maxLength: 11,
    },
    rules: {
      required: '필수 입력 항목입니다.',
      minLength: 11,
      maxLength: 11,
    },
  },
  {
    id: 'password',
    title: '비밀번호를 입력해주세요',
    subTitle: '',
    inputProps: {
      title: '비밀번호',
      placeholder: '비밀번호',
      inputMode: 'text',
      autoFocus: true,
      maxLength: 20,
      filterRule: /\s/g,
      secureTextEntry: true,
    },
    rules: {
      required: '필수 입력 항목입니다',
      minLength: {
        value: 8,
        message: '8자리 이상 입력해주세요',
      },
    },
  },
];

export const SignUpStageInfo: IStageInfoType[] = [
  {
    id: 'phonenumber',
    title: '휴대폰 번호를 알려주세요',
    subTitle: '이미 회원이라면 로그인, 새로 오셨다면 회원가입을 진행할게요',
    inputProps: {
      title: '전화번호',
      placeholder: '전화번호',
      inputMode: 'tel',
      autoFocus: true,
      maxLength: 11,
    },
    rules: {
      required: '필수 입력 항목입니다.',
      minLength: 11,
      maxLength: 11,
    },
  },
  {
    id: 'code',
    title: '인증번호를 입력해주세요',
    subTitle: '인증번호 4자리를 문자로 전송했어요',
    inputProps: {
      title: '인증번호',
      placeholder: '인증번호',
      inputMode: 'tel',
      autoFocus: true,
      maxLength: 4,
    },
    rules: {
      minLength: 4,
      maxLength: 4,
    },
  },
  {
    id: 'username',
    title: '이름을 알려주세요',
    subTitle: '공연 예약 및 현장 입장 확인에 필요해요',
    inputProps: {
      title: '이름',
      placeholder: '이름',
      inputMode: 'text',
      autoFocus: true,
      maxLength: 5,
    },
    rules: {
      required: '필수 입력 항목입니다',
      minLength: 2,
      maxLength: 5,
      pattern: {
        value: /^[가-힣]{2,4}$/,
        message: '올바른 형식으로 입력해주세요',
      },
    },
  },
  {
    id: 'password',
    title: '설정할 비밀번호를 입력해주세요',
    subTitle: '',
    inputProps: {
      title: '비밀번호',
      placeholder: '비밀번호',
      inputMode: 'text',
      autoFocus: true,
      maxLength: 20,
      filterRule: /\s/g,
      secureTextEntry: true,
    },
    rules: {
      required: '필수 입력 항목입니다',
      minLength: {
        value: 8,
        message: '8자리 이상 입력해주세요',
      },
    },
  },
  {
    id: 'passwordRepeat',
    title: '비밀번호를 다시 입력해주세요',
    subTitle: '',
    inputProps: {
      title: '비밀번호 재확인',
      placeholder: '비밀번호 재확인',
      inputMode: 'text',
      autoFocus: true,
      maxLength: 20,
      filterRule: /\s/g,
      secureTextEntry: true,
    },
    rules: {
      required: '필수 입력 항목입니다',
      maxLength: 20,
    },
  },
] as const;
