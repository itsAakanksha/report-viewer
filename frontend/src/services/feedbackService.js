import { apiClient } from './apiClient';

// Feedback service - handles all feedback-related API calls
export const feedbackService = {
  // Submit feedback for a report
  async submitFeedback(reportId, feedbackData) {
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
      throw new Error('Access denied');
    }
  },

  // Get feedback for a specific report (admin function)
  async getFeedbackByReportId(reportId) {
    try {
      const response = await apiClient.get(`/feedback/${reportId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
      throw new Error('Failed to fetch feedback. Please try again.');
    }
  }
};
