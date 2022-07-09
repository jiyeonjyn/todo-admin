import { httpClient } from './httpClient';

export const postAdminTest = async () => {
  return await httpClient
    .get('admin/test/aksdlffsd')
    .then((response) => response.data.result);
};
