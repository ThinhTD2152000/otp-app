import { get, post, setAuthToken } from './apiClient';

export const login = async (credentials) => {
  try {
    const response = await post('auth/login', credentials, false);
    console.log(credentials);
    setAuthToken(response.token); // Lưu token sau khi đăng nhập thành công
    return await getMe();
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  console.log(userData);
  try {
    const response = await post('auth/register', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  console.log('getme');
  try {
    return await get('auth/me');
  } catch (err) {
    throw err;
  }
};
