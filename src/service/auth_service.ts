import { AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

export type LocalUser = {
  userId: string;
  refreshToken: string;
};

export const logIn = (user: LocalUser, accessToken: string) => {
  window.localStorage.setItem('user', JSON.stringify(user));
  httpClient.defaults.headers.common['Authorization'] = accessToken;
  httpClient.defaults.headers.common['refresh'] = user.refreshToken;
};

export const logOut = async () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  const response: AxiosResponse | undefined =
    user.userId &&
    (await httpClient.post('auth/signout', { userId: user.userId }));
  if (response?.status === 200) {
    window.localStorage.removeItem('user');
    delete httpClient.defaults.headers.common['Authorization'];
    delete httpClient.defaults.headers.common['refresh'];
    return true;
  }
  return false;
};

export const checkUserId = async (userId: string) =>
  await httpClient
    .get('auth/userid', { params: { userId } })
    .then((response) => !response.data);

export const checkEmail = async (userEmail: string) =>
  await httpClient
    .get('auth/email', { params: { userEmail } })
    .then((response) => !response.data);

export const refreshToken = async () =>
  await httpClient.post('auth/refreshToken').then(console.log);
