import { httpClient } from '../../service/httpClient';
import { useQuery, UseQueryResult } from 'react-query';
import { ResponseUsersDto } from '../../types/dto';
import { AxiosError } from 'axios';

const api = async (roleNumber: number) =>
  await httpClient
    .get(`admin/users/${roleNumber}`)
    .then((response) => response.data.result);

const useUsersQuery = (
  isLoggedIn: boolean,
  roleNumber: number
): UseQueryResult<ResponseUsersDto, AxiosError> =>
  useQuery(
    ['users', { isLoggedIn, roleNumber }],
    () => (isLoggedIn ? api(roleNumber) : undefined),
    {
      retry: false,
      onError: (error: AxiosError) => console.log(error.message),
    }
  );

export default useUsersQuery;
