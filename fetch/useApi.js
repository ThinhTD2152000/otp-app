

const BASE_URL = 'http://192.168.110.220:3002';

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

    let responseData;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text(); // Tránh lỗi nếu không phải JSON
    }

    if (!response.ok) {
      throw new Error(responseData?.message || 'Request failed');
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

//  GET
export const get = async (endpoint, headers = {}) => {
  return await fetchData(endpoint, { method: 'GET', headers });
};

//  POST
export const post = async (endpoint, body, headers = {}) => {
  return await fetchData(endpoint, { method: 'POST', body, headers });
};
