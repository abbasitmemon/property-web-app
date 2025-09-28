import { post } from '../api/http';

export const loginApi = async (credentials) => {
  const res = await post('/admin/login', credentials);
  // res shape: { data: { token, user }, status: true, ... }
  return res.data;
};

export const logoutApi = async () => {
  await post('/admin/logout');
};
