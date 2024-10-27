import axios from '@/lib/axios';
import { ApiStatusHandler } from '@/lib/apiStatusHandler';
import { AxiosResponse } from 'axios';

interface User {
  uuid: number;
  phoneNumber: string;
  userName: string;
  phoneVerified: boolean;
  password: string;
  createdAt: string;
}

// API

interface PSignUp {
  username: string;
  phonenumber: string;
  password: string;
}

interface ResSignUp {
  status: 'success' | 'error';
  data: {
    user: User;
  };
  message: string;
}

function signUp(userData: PSignUp): Promise<AxiosResponse<ResSignUp>> {
  return axios.post('/auth/signup', {
    userName: userData.username,
    phoneNumber: userData.phonenumber,
    password: userData.password,
  });
}

interface PSignIn {
  phonenumber: string;
  password: string;
}

interface ResSignIn {
  authResponse: {
    message: string;
    token: string;
  };
}

function signIn(userData: PSignIn): Promise<AxiosResponse<any>> {
  return axios.post('/auth/signin', {
    phoneNumber: userData.phonenumber,
    password: userData.password,
  });
}

function sendCodeTo(phoneNumber: string) {
  return axios.get(`/auth/${phoneNumber}/send-sms`);
}

interface PVerfiyCode {
  phonenumber: string;
  code: string;
}

interface ResVerifyCode {
  status: 'success' | 'error';
  data: {
    user: User;
  };
  message: string;
}
function verifyCode(
  userData: PVerfiyCode
): Promise<AxiosResponse<ResVerifyCode>> {
  return axios.post(`/auth/verify-sms`, {
    phoneNumber: userData.phonenumber,
    userVerifiedNumber: userData.code,
  });
}

export default {
  signUp: ApiStatusHandler<ResSignUp>(signUp),
  signIn: ApiStatusHandler<ResSignIn>(signIn),
  sendCodeTo: ApiStatusHandler(sendCodeTo),
  verifyCode: ApiStatusHandler(verifyCode),
};
