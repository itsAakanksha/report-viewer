// Base API client configuration
const API_BASE_URL = import.meta.env.BACKEND_URL || 'http://localhost:3001/api';

// HTTP client with error handling
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const viewerTokens = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ2aWV3ZXIiLCJyb2xlIjoidmlld2VyIiwiaWF0IjoxNzUyNzQ3OTg1LCJleHAiOjE3NTc5MzE5ODV9.LZ8D1FrT6h7ZXtV2xKaF9Pd3bFluuwepuhXKFEx8dWk'

    const reviewerTokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJyZXZpZXdlciIsInJvbGUiOiJyZXZpZXdlciIsImlhdCI6MTc1Mjc1MDIyMiwiZXhwIjoxNzU3OTM0MjIyfQ.JPfXuCJaynDvCkpTFQPayh9O3MSis1rz-915q80Q2Q4"
   
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${reviewerTokens}`,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Parse response
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint, params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });
    
    const queryString = searchParams.toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

 
}

export const apiClient = new ApiClient(API_BASE_URL);
