// services/apiService.js
import { Alert } from 'react-native';

const BASE_URL = 'http://10.0.2.2:3002';

const fetchData = async (endpoint, options = {}) => {
  const { method = 'GET', headers = {}, body } = options;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);

    Alert.alert('Lỗi', error.message || 'Đã có lỗi xảy ra');

    throw error;
  }
};

//  GET
export const get = (endpoint, headers) =>
  fetchData(endpoint, { method: 'GET', headers });

//  POST
export const post = (endpoint, body, headers) =>
  fetchData(endpoint, { method: 'POST', body, headers });
