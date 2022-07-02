import { httpClient } from '../../service/httpClient';
import { AxiosResponse, AxiosError } from 'axios';
import { UseMutationResult, useMutation } from 'react-query';
import { ResponseSignInDto, RequestSignInDto } from '../../types/dto';

const api = async (data: RequestSignInDto) =>
  await httpClient.post('auth/signin', data);

const useAuthSigninMutation = (): UseMutationResult<
  AxiosResponse<ResponseSignInDto>,
  AxiosError,
  RequestSignInDto
> => useMutation((data) => api(data));

export default useAuthSigninMutation;
