// Export all services from a single entry point
export { reportsService } from './reportsService';
export { feedbackService } from './feedbackService';
export { apiClient } from './apiClient';

// Import services for the api object
import { reportsService } from './reportsService';
import { feedbackService } from './feedbackService';

// For backward compatibility, export the old api object
export const api = {
  getReports: (filters) => reportsService.getReports(filters),
  getReportById: (id) => reportsService.getReportById(id),
  getFilterOptions: () => reportsService.getFilterOptions(),
  submitFeedback: (reportId, feedbackData) => feedbackService.submitFeedback(reportId, feedbackData),
  getFeedbackByReportId: (reportId) => feedbackService.getFeedbackByReportId(reportId),
};
