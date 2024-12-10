import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  View,
  Alert,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Button } from '@/components/common/Button';
import { HeaderTitle } from '@/components/common/HeaderTitle';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import OutlinedTextInput from '@/components/create/OutlinedTextInput';
import { CreateFormInfo } from '../../constants/FormInfo';
import { KeyboardAvoidingWithHeader } from '@/components/template/KeyboardAvoidingWithHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { RoundedButton } from '@/components/common/RoundedButton';
import api from '@/api';
import { router, useLocalSearchParams } from 'expo-router';

type Form = {
  [key in (typeof CreateFormInfo)[number]['id']]: string;
};

interface IForm extends Form {
  image: object;
}

export default function CreatePostScreen() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const params = useLocalSearchParams();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const photo = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: `${result.assets[0].fileName}`,
      };
      setValue('image', photo);
      setImage(result.assets[0].uri);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({
    defaultValues: {
      eventTitle: '',
      eventLocation: '',
      eventDate: '',
      eventDescription: '',
      precautions: '',
      eventInfoLink: '',
      image: new FormData(),
    },
  });

  const onDateConfirm = (date: Date) => {
    setShow(false);
    setValue('eventDate', date.toLocaleDateString('ko'));
  };

  const onSubmitSuccess: SubmitHandler<IForm> = useCallback(async (form) => {
    console.log('form', form);
    api.event.createEvent(form, {
      onSuccess: (res) => {
        console.log(res);
        Alert.alert('게시글 생성을 성공했습니다.', '', [
          {
            text: '확인',
            onPress: () => {
              router.replace('/tabs/');
            },
          },
        ]);
      },
    });
  }, []);

  const onSubmitFail: SubmitErrorHandler<IForm> = useCallback((error) => {
    console.log('error', error);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingWithHeader>
        <ScrollView style={styles.container}>
          <View style={{ flex: 1, paddingBottom: 30 }}>
            <HeaderTitle>공연 생성</HeaderTitle>
            {CreateFormInfo.map((info) => {
              if (info.id === 'eventDate') {
                return (
                  <OutlinedTextInput
                    key={info.id}
                    name={info.id}
                    control={control}
                    rules={info.rules}
                    textInputProps={{
                      readOnly: Platform.OS !== 'web',
                      onPress: () => {
                        Keyboard.dismiss();
                        setShow(true);
                      },
                      ...info.inputProps,
                    }}
                  />
                );
              } else if (info.id === 'eventLocation') {
                return (
                  <OutlinedTextInput
                    key={info.id}
                    name={info.id}
                    control={control}
                    rules={info.rules}
                    textInputProps={{
                      // readOnly: true,
                      // onPress: () => {
                      //   router.replace('/create/address');
                      // },
                      ...info.inputProps,
                    }}
                  />
                );
              } else {
                return (
                  <OutlinedTextInput
                    key={info.id}
                    name={info.id}
                    control={control}
                    rules={info.rules}
                    textInputProps={info.inputProps}
                  />
                );
              }
            })}
            <Button title='이미지 선택' onPress={pickImage} />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingWithHeader>
      <RoundedButton
        title='작성 완료'
        style={{ marginHorizontal: 14 }}
        disabled={!isValid}
        onPress={handleSubmit(onSubmitSuccess, onSubmitFail)}
      />
      <DateTimePickerModal
        isVisible={show}
        mode='date'
        onConfirm={onDateConfirm}
        onCancel={() => setShow(false)}
        locale='ko'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 14,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
});
