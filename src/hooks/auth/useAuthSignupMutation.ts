import { httpClient } from '../../service/httpClient';
import { RequestSignUpDto } from '../../types/dto';
import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

const api = async (data: RequestSignUpDto) =>
  await httpClient.post('auth/signup', {
    ...data,
    role: 'a',
  });

const useAuthSignupMutation = (): UseMutationResult<
  AxiosResponse<any>,
  AxiosError,
  RequestSignUpDto
> => useMutation((data) => api(data));

export default useAuthSignupMutation;
