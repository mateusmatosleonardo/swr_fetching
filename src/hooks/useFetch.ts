import { Method } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

import { api } from '../services/api';

const defaultOptions: SWRConfiguration = {
  revalidateOnFocus: false,
  refreshInterval: 5000 * 60, // 5 minutos
};

export function useFetch<Data = unknown, Error = unknown>(
  path: string,
  method: Method = 'GET',
  swrOptions = defaultOptions
) {
  const data = useSWR<Data, Error>(
    path,
    async (url: string) => {
      const response = await api.request({
        method,
        url,
      });

      return response.data;
    },
    swrOptions
  );
  return data;
}
