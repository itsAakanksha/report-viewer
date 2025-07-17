

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';
const reviewerTokens = import.meta.env.VITE_JWT_REVIEWER || "jwt-token-for-reviewer";
const viewerTokens = import.meta.env.VITE_JWT_VIEWER || "jwt-token-for-viewer";
console.log("reviewerTokens", reviewerTokens);
console.log("viewerTokens", viewerTokens);
// HTTP client with error handling
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

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
