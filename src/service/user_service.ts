import { httpClient } from './httpClient';

export const deleteUser = async (userid: string) =>
  await httpClient.delete('admin/user', {
    data: {
      userid,
    },
  });
