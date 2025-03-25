import axios from 'axios';

const API_BASE_URL = '';

export const requestOtp = async (data) => {
  try {
    const response = await axios.post('', data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi OTP:', error);
    throw error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await axios.post('', data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xác minh OTP:', error);
    throw error;
  }
};
