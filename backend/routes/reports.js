const express = require('express');
const { requireViewer } = require('../middleware/auth');
const { getReports, getReportById, getFilterOptions } = require('../services/reportsService');

const router = express.Router();

router.get('/', requireViewer, async (req, res) => {
  try {
    const { page, limit, type, industry, search, confidence } = req.query;
    
    const result = await getReports({
      page,
      limit,
      filters: { type, industry, search, confidence }
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch reports'
    });
  }
});

router.get('/:id', requireViewer, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await getReportById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Report with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch report'
    });
  }
});

router.get('/filters/options', requireViewer, async (req, res) => {
  try {
    const options = await getFilterOptions();
    res.status(200).json({
      success: true,
      data: options
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch filter options'
    });
  }
});

module.exports = router;
