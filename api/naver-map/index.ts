import { ApiStatusHandler } from '@/lib/apiStatusHandler';
import { AxiosResponse } from 'axios';
import axios from '@/lib/axios';

export interface ResGetAddress {
  address: string;
  latitude: string;
  longitude: string;
  title: string;
}

function getAddress(query: string): Promise<AxiosResponse<ResGetAddress[]>> {
  return axios.get(`/api/naver-map/place/${query}`);
}

export default {
  getAddress: ApiStatusHandler<ResGetAddress[]>(getAddress),
};
