import { apiClient } from './apiClient';

// Reports service - handles all report-related API calls
export const reportsService = {
  // Get reports with pagination and filtering
  async getReports(filters = {}) {
    try {
      const params = {
        page: filters.page || 1,
        limit: filters.limit || 10,
        ...(filters.reportType && filters.reportType !== 'all' && { type: filters.reportType }),
        ...(filters.industry && filters.industry !== 'all' && { industry: filters.industry }),
        ...(filters.search && { search: filters.search }),
        ...(filters.confidenceScore && filters.confidenceScore !== 'all' && { confidence: filters.confidenceScore }),
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
  async getReportById(id) {
    try {
      const response = await apiClient.get(`/reports/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch report:', error);
      throw new Error('Failed to fetch report. Please try again.');
    }
  },

  // Get available filter options
  async getFilterOptions() {
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
  }
};
