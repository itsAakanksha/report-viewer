// API Configuration
const API_BASE_URL = import.meta.env.BACKEND_URL || 'http://localhost:3001/api';

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

const apiClient = new ApiClient(API_BASE_URL);

// API methods
export const api = {
  // Get reports with pagination and filtering
  getReports: async (filters = {}) => {
    try {
      const params = {
        page: filters.page || 1,
        limit: filters.limit || 10,
        ...(filters.reportType && filters.reportType !== 'all' && { type: filters.reportType }),
        ...(filters.industry && filters.industry !== 'all' && { industry: filters.industry }),
        ...(filters.search && { search: filters.search }),
      };

      const response = await apiClient.get('/reports', params);
      
      return {
        reports: response.data.reports || [],
        total: response.data.pagination?.total || 0,
        pagination: response.data.pagination || {}
      };
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      throw new Error('Failed to fetch reports. Please try again.');
    }
  },

  // Get a specific report by ID
  getReportById: async (id) => {
    try {
      const response = await apiClient.get(`/reports/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch report:', error);
      throw new Error('Failed to fetch report. Please try again.');
    }
  },

  // Submit feedback for a report
  submitFeedback: async (reportId, feedbackData) => {
    try {
      const payload = {
        reportId,
        feedback: feedbackData.feedback,
        type: feedbackData.type || 'general',
        ...(feedbackData.severity && { severity: feedbackData.severity }),
        ...(feedbackData.flaggedSection && { flaggedSection: feedbackData.flaggedSection }),
      };

      const response = await apiClient.post('/feedback', payload);
      return response.data;
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      throw new Error('Failed to submit feedback. Please try again.');
    }
  },

  // Get available filter options
  getFilterOptions: async () => {
    try {
      const response = await apiClient.get('/reports/filters/options');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
      // Return fallback options if API fails
      return {
        reportTypes: ['Risk Assessment', 'Competitive Analysis', 'Strategic Analysis'],
        industries: ['Technology', 'Healthcare', 'Financial Services', 'Pharmaceuticals'],
        confidenceRanges: [
          { label: 'All Confidence Levels', value: 'all' },
          { label: 'High (80-100%)', value: 'high' },
          { label: 'Medium (60-79%)', value: 'medium' },
          { label: 'Low (0-59%)', value: 'low' }
        ]
      };
    }
  },

  // Get feedback for a specific report (admin function)
  getFeedbackByReportId: async (reportId) => {
    try {
      const response = await apiClient.get(`/feedback/${reportId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
      throw new Error('Failed to fetch feedback. Please try again.');
    }
  }
};
