const express = require('express');
const { requireReviewer } = require('../middleware/auth');
const { submitFeedback, getFeedbackByReportId } = require('../services/feedbackService');

const router = express.Router();

router.post('/', requireReviewer, async (req, res) => {
  try {
    const { reportId, feedback, type, severity, flaggedSection } = req.body;
    
    const result = await submitFeedback({
      reportId,
      feedback,
      type,
      severity,
      flaggedSection,
      submittedBy: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      }
    });

    res.status(201).json({
      success: true,
      data: result,
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to submit feedback'
    });
  }
});

router.get('/:reportId', requireReviewer, async (req, res) => {
  try {
    const { reportId } = req.params;
    const feedback = await getFeedbackByReportId(reportId);

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch feedback'
    });
  }
});

module.exports = router;
