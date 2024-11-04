import { RegisterOptions } from 'react-hook-form';
import { TInputProps } from '@/components/create/OutlinedTextInput';

export type ICreateFormType = {
  id:
    | 'eventTitle'
    | 'eventLocation'
    | 'eventDate'
    | 'eventDescription'
    | 'precautions'
    | 'eventInfoLink';
  inputProps: TInputProps;
  rules?: RegisterOptions | undefined;
};

export const CreateFormInfo: ICreateFormType[] = [
  {
    id: 'eventTitle',
    inputProps: {
      title: '공연명',
      placeholder: '공연명을 입력해주세요',
      autoFocus: true,
    },
    rules: {
      required: '필수 입력 항목입니다.',
    },
  },
  {
    id: 'eventLocation',
    inputProps: {
      title: '공연장소',
      placeholder: '공연장소를 입력해주세요',
      inputMode: 'text',
      maxLength: 20,
    },
    rules: {
      required: '필수 입력 항목입니다',
    },
  },
  {
    id: 'eventDate',
    inputProps: {
      title: '공연일자',
      placeholder: '공연일자를 입력해주세요',
      maxLength: 20,
    },
    rules: {
      required: '필수 입력 항목입니다',
    },
  },
  {
    id: 'eventDescription',
    inputProps: {
      title: '공연내용',
      placeholder: '공연내용을 입력해주세요',
      inputMode: 'text',
    },
    rules: {
      required: '필수 입력 항목입니다',
    },
  },
  {
    id: 'precautions',
    inputProps: {
      title: '공연 주의사항',
      placeholder: '공연 주의사항을 입력해주세요',
      inputMode: 'text',
    },
  },
  {
    id: 'eventInfoLink',
    inputProps: {
      title: '공연정보 링크',
      placeholder: '공연정보 링크를 입력해주세요 (노션/웹사이트)',
      inputMode: 'text',
    },
  },
];
