const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

// In-memory storage for feedback - in production, this would be a database
const feedbackStorage = [];

/**
 * Submit feedback for a report
 */
const submitFeedback = async (feedbackData) => {
  const {
    reportId,
    feedback,
    type,
    severity,
    flaggedSection,
    traceId,
    ip,
    userAgent
  } = feedbackData;

  // Simulate database write delay
  await new Promise(resolve => setTimeout(resolve, 50));

  const feedbackRecord = {
    id: uuidv4(),
    reportId,
    feedback,
    type: type || 'general',
    severity,
    flaggedSection,
    metadata: {
      traceId,
      ip,
      userAgent,
      submittedAt: new Date().toISOString()
    }
  };

  // Store feedback
  feedbackStorage.push(feedbackRecord);

  logger.info('Feedback stored successfully', {
    feedbackId: feedbackRecord.id,
    reportId,
    type: feedbackRecord.type,
    traceId
  });

  // Return sanitized response (excluding sensitive metadata)
  return {
    id: feedbackRecord.id,
    reportId: feedbackRecord.reportId,
    type: feedbackRecord.type,
    severity: feedbackRecord.severity,
    submittedAt: feedbackRecord.metadata.submittedAt,
    status: 'submitted'
  };
};

/**
 * Get feedback for a specific report
 */
const getFeedbackByReportId = async (reportId) => {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 50));

  const reportFeedback = feedbackStorage.filter(
    feedback => feedback.reportId === reportId
  );

  // Return sanitized feedback (excluding sensitive metadata)
  return reportFeedback.map(feedback => ({
    id: feedback.id,
    reportId: feedback.reportId,
    feedback: feedback.feedback,
    type: feedback.type,
    severity: feedback.severity,
    flaggedSection: feedback.flaggedSection,
    submittedAt: feedback.metadata.submittedAt
  }));
};

/**
 * Get all feedback (admin function)
 */
const getAllFeedback = async () => {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 50));

  return feedbackStorage.map(feedback => ({
    id: feedback.id,
    reportId: feedback.reportId,
    feedback: feedback.feedback,
    type: feedback.type,
    severity: feedback.severity,
    flaggedSection: feedback.flaggedSection,
    submittedAt: feedback.metadata.submittedAt
  }));
};

/**
 * Get feedback statistics
 */
const getFeedbackStats = async () => {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 50));

  const total = feedbackStorage.length;
  const byType = feedbackStorage.reduce((acc, feedback) => {
    acc[feedback.type] = (acc[feedback.type] || 0) + 1;
    return acc;
  }, {});

  const errors = feedbackStorage.filter(f => f.type === 'error');
  const bySeverity = errors.reduce((acc, feedback) => {
    if (feedback.severity) {
      acc[feedback.severity] = (acc[feedback.severity] || 0) + 1;
    }
    return acc;
  }, {});

  return {
    total,
    byType,
    errorsBySeverity: bySeverity,
    recentFeedback: feedbackStorage
      .slice(-10)
      .reverse()
      .map(f => ({
        id: f.id,
        reportId: f.reportId,
        type: f.type,
        severity: f.severity,
        submittedAt: f.metadata.submittedAt
      }))
  };
};

module.exports = {
  submitFeedback,
  getFeedbackByReportId,
  getAllFeedback,
  getFeedbackStats
};
