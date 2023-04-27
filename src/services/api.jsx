// api.js

const API_BASE_URL = 'https://api.example.com'; // replace with your API base URL

// Function to handle API response and return parsed JSON
const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
};

// Function to handle API errors
const handleError = (error) => {
  console.error('API error:', error);
  throw error;
};

// Function to make GET request to API
export const get = async (endpoint, queryParams = {}) => {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, queryParams[key])
  );

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// Function to make POST request to API
export const post = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// Function to make PUT request to API
export const put = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// Function to make DELETE request to API
export const del = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
