import { ElementType } from 'react';
import api from './api'; 

export const loginUser = async (name: string, email: string) => {
    const response = await api.post("/auth/login", { name, email }, {
      withCredentials: true,
    });
    return {
      user: response.data,
      name: name,
      email: email,
      cookies: response.headers['set-cookie']
    };
  };

export const logoutUser = async () => {
  await api.post("/auth/logout", {}, { withCredentials: true });
};
