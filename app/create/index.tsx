import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/common/Button';
import { HeaderTitle } from '@/components/common/HeaderTitle';
import { useForm } from 'react-hook-form';
import OutlinedTextInput from '@/components/create/OutlinedTextInput';
import { CreateFormInfo } from './FormInfo';

type FormData = {
  [key in (typeof CreateFormInfo)[number]['id']]: string;
};

export default function CreatePostScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      eventTitle: '',
      eventLocation: '',
      eventDate: '',
      eventDescription: '',
      precautions: '',
      eventInfoLink: '',
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={styles.container}>
        <HeaderTitle>공연 생성</HeaderTitle>
        {CreateFormInfo.map((info) => (
          <OutlinedTextInput
            key={info.id}
            name={info.id}
            control={control}
            rules={info.rules}
            textInputProps={info.inputProps}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 1000,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
});
