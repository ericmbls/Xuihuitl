import api from './axios';

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const register = (data: { email: string; password: string }) =>
  api.post('/auth/register', data);