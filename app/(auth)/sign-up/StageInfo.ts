import { IProps } from '@/components/auth/TitledTextInput';

export interface IStageInfoType {
  id: string;
  title: string;
  subTitle: string;
  inputProps: IProps;
}

export const StageInfo = [
  {
    id: 'username',
    title: '이름을 알려주세요',
    subTitle: '공연 예약에 필요해요',
    inputProps: {
      title: '이름',
      placeholder: '이름',
      inputMode: 'text',
      autoFocus: true,
      maxLength: 6,
    },
  },
  {
    id: 'phonenumber',
    title: '휴대폰 번호를 알려주세요',
    subTitle: '공연 안내 및 공지사항 전송을 위해 필요해요',
    inputProps: {
      title: '전화번호',
      placeholder: '전화번호',
      inputMode: 'tel',
      autoFocus: true,
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
  },
] as const;

export const FormId = StageInfo.map((val) => val.id);
