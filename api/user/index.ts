import axios from '@/lib/axios';
import { ApiStatusHandler } from '@/lib/apiStatusHandler';
import { AxiosResponse } from 'axios';

interface ResIsUser {
  exists: boolean;
}

function isUser(phonenumber: string) {
  return axios.get(`/user/${phonenumber}/valid`);
}

export default {
  isUser: ApiStatusHandler<ResIsUser>(isUser),
};
