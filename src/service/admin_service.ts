import { refreshToken } from './auth_service';
import { httpClient } from './httpClient';

export const postAdminUsers = async () => {
  let response;
  try {
    response = await httpClient
      .get('admin/users/0')
      .then((response) => response.data.result);
  } catch (error: any) {
    console.log(error);
    error.response.status === 403 && refreshToken();
  }
  return response;
};
