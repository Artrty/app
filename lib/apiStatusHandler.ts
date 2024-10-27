import axios, { AxiosResponse, AxiosError } from 'axios';

interface Props<R> {
  onSuccess?: (data: AxiosResponse<Res<R>, any>) => void;
  onError?: (e: AxiosError<Res<R>>) => void;
  onClientError?: (e: AxiosError<Res<R>>) => void;
  onServerError?: (e: AxiosError<Res<R>>) => void;
  onUnknownError?: (e: any) => void;
}

interface Res<T> {
  status: 'success' | 'error';
  httpStatus: number;
  data: T;
  message: string;
  code: string;
}

export function ApiStatusHandler<R, T = any>(
  api: (q: T) => Promise<AxiosResponse<any, any>>
) {
  return async (
    q: T,
    {
      onSuccess,
      onError,
      onClientError,
      onServerError,
      onUnknownError,
    }: Props<R>
  ) => {
    api(q)
      .then((data) => onSuccess && onSuccess(data))
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          console.log(e);
          onError && onError(e);
          if (e.response?.status < 500) {
            // client error
            console.log('client error: ', e);
            onClientError && onClientError(e);
          } else if (e.response?.status < 600) {
            // server error
            console.log('server error: ', e);
            onServerError && onServerError(e);
          } else {
            // unknown error
            console.log('unknown axios error: ', e);
            console.log(e);
            onUnknownError && onUnknownError(e);
          }
        } else {
          // unknown error
          console.log('unknown error: ', e);
          console.log(e);
          onUnknownError && onUnknownError(e);
        }
      });
  };
}