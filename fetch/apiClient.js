const BASE_URL = 'http://192.168.110.220:3002';

// Biến lưu trữ token trong memory
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

export const getCurrentToken = () => {
  return authToken;
};

const fetchData = async (endpoint, options = {}) => {
  const { method = 'GET', headers = {}, body } = options;

  console.log('token:', authToken)

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
  };

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
    

    const contentType = response.headers.get('content-type');
    let responseData;

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMessage = responseData?.message || 
                         responseData?.error || 
                         `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error.message);
    
    // Tự động đăng xuất nếu token hết hạn
    if (error.message.includes('401')) {
      clearAuthToken();
    }
    
    throw error;
  }
};

// Các phương thức HTTP cơ bản
export const get = async (endpoint, headers = {}) => await fetchData(endpoint, { method: 'GET', headers });
export const post = async (endpoint, body, headers = {}) =>  await fetchData(endpoint, { method: 'POST', body, headers });
export const put = async (endpoint, body, headers = {}) =>await  fetchData(endpoint, { method: 'PUT', body, headers });
export const del = async (endpoint, headers = {}) => await fetchData(endpoint, { method: 'DELETE', headers });