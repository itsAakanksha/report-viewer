const { v4: uuidv4 } = require('uuid');

// Mock data for reports - in production, this would be from a database
const mockReports = [
  {
    id: '1',
    title: 'Emerging Risks in EU Pharmaceutical Supply Chain',
    summary: 'Analysis of critical vulnerabilities in European pharmaceutical supply chains reveals heightened exposure to geopolitical tensions and regulatory changes affecting drug availability and pricing.',
    reportType: 'Risk Assessment',
    industry: 'Pharmaceuticals',
    confidenceScore: 92,
    date: '2024-10-12T00:00:00Z',
    author: 'Dr. Sarah Chen',
    details: {
      keyFindings: [
        'Supply chain disruptions affecting 23% of critical medications',
        'Regulatory compliance costs increased by 18% year-over-year',
        'Geopolitical tensions impacting raw material procurement',
        'Digital transformation reducing operational risks by 15%'
      ],
      methodology: 'Comprehensive analysis of 150+ pharmaceutical companies across 12 European markets',
      dataPoints: 45000
    },
    sources: [
      {
        id: 's1',
        title: 'European Medicines Agency Report 2024',
        type: 'Regulatory',
        reliability: 95,
        description: 'Official regulatory assessment of pharmaceutical supply chain risks.',
        lastUpdated: '2024-09-15T00:00:00Z'
      },
      {
        id: 's2',
        title: 'Industry Survey: Pharmaceutical Manufacturing',
        type: 'Primary Research',
        reliability: 88,
        description: 'Direct survey of 200+ pharmaceutical manufacturers across Europe.',
        lastUpdated: '2024-08-20T00:00:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'AI-Driven Competitive Analysis: Cloud Computing',
    summary: 'Comprehensive market analysis leveraging AI to identify competitive dynamics and growth opportunities in the rapidly evolving cloud computing sector.',
    reportType: 'Competitive Analysis',
    industry: 'Technology',
    confidenceScore: 87,
    date: '2024-10-08T00:00:00Z',
    author: 'Michael Rodriguez',
    details: {
      keyFindings: [
        'Market consolidation accelerating with 40% increase in M&A activity',
        'Edge computing emerging as key differentiator',
        'Sustainability metrics becoming primary selection criteria',
        'Multi-cloud adoption reached 85% among enterprise clients'
      ],
      methodology: 'AI-powered analysis of market data, financial reports, and competitive positioning',
      dataPoints: 78000
    },
    sources: [
      {
        id: 's3',
        title: 'Gartner Cloud Infrastructure Report',
        type: 'Industry Analysis',
        reliability: 92,
        description: 'Authoritative analysis of cloud infrastructure market trends.',
        lastUpdated: '2024-09-01T00:00:00Z'
      },
      {
        id: 's4',
        title: 'Enterprise Cloud Survey 2024',
        type: 'Primary Research',
        reliability: 85,
        description: 'Survey of 500+ enterprise IT decision makers on cloud adoption.',
        lastUpdated: '2024-08-15T00:00:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Supply Chain Resilience in Banking Transformation',
    summary: 'Strategic assessment of banking sector supply chain vulnerabilities and transformation opportunities in the context of digital banking evolution.',
    reportType: 'Strategic Analysis',
    industry: 'Financial Services',
    confidenceScore: 78,
    date: '2024-10-05T00:00:00Z',
    author: 'Dr. Jennifer Liu',
    details: {
      keyFindings: [
        'Digital transformation reducing operational costs by 25%',
        'Cyber security investments up 45% year-over-year',
        'Regulatory compliance complexity increasing operational overhead',
        'Customer experience metrics driving technology adoption'
      ],
      methodology: 'Mixed-methods analysis combining quantitative data and qualitative insights',
      dataPoints: 32000
    },
    sources: [
      {
        id: 's5',
        title: 'Banking Industry Cybersecurity Report',
        type: 'Security Analysis',
        reliability: 90,
        description: 'Comprehensive analysis of cybersecurity threats in banking.',
        lastUpdated: '2024-09-10T00:00:00Z'
      },
      {
        id: 's6',
        title: 'Digital Banking Transformation Survey',
        type: 'Primary Research',
        reliability: 82,
        description: 'Survey of 300+ banking executives on digital transformation.',
        lastUpdated: '2024-08-25T00:00:00Z'
      }
    ]
  },
  {
    id: '4',
    title: 'Innovation Metrics in Fintech Startups',
    summary: 'Analysis of innovation indicators and performance metrics across emerging fintech companies, identifying key success factors and growth patterns.',
    reportType: 'Innovation Analysis',
    industry: 'Financial Services',
    confidenceScore: 82,
    date: '2024-10-01T00:00:00Z',
    author: 'Alex Thompson',
    details: {
      keyFindings: [
        'API-first architecture adoption at 75% among successful startups',
        'Regulatory compliance costs averaging 12% of revenue',
        'Customer acquisition costs decreased by 30% through AI implementation',
        'Partnership strategies with traditional banks showing 60% success rate'
      ],
      methodology: 'Quantitative analysis of 200+ fintech companies with qualitative case studies',
      dataPoints: 55000
    },
    sources: [
      {
        id: 's7',
        title: 'Fintech Innovation Index 2024',
        type: 'Industry Analysis',
        reliability: 88,
        description: 'Annual index tracking fintech innovation and market dynamics.',
        lastUpdated: '2024-09-20T00:00:00Z'
      },
      {
        id: 's8',
        title: 'Startup Ecosystem Analysis',
        type: 'Market Research',
        reliability: 85,
        description: 'Comprehensive analysis of fintech startup ecosystem.',
        lastUpdated: '2024-08-30T00:00:00Z'
      }
    ]
  },
  {
    id: '5',
    title: 'Security Vulnerabilities in IoT Healthcare Devices',
    summary: 'Critical security assessment of Internet of Things devices in healthcare settings, identifying vulnerabilities and recommending mitigation strategies.',
    reportType: 'Security Assessment',
    industry: 'Healthcare',
    confidenceScore: 94,
    date: '2024-09-28T00:00:00Z',
    author: 'Dr. Maria Gonzalez',
    details: {
      keyFindings: [
        'Critical vulnerabilities identified in 65% of tested devices',
        'Encryption protocols missing in 40% of medical IoT devices',
        'Network segmentation inadequate in 70% of healthcare facilities',
        'Patch management processes need improvement in 85% of organizations'
      ],
      methodology: 'Penetration testing and vulnerability assessment of 150+ IoT healthcare devices',
      dataPoints: 28000
    },
    sources: [
      {
        id: 's9',
        title: 'Healthcare IoT Security Standards',
        type: 'Standards Document',
        reliability: 96,
        description: 'Official security standards for IoT devices in healthcare.',
        lastUpdated: '2024-09-01T00:00:00Z'
      },
      {
        id: 's10',
        title: 'Healthcare Cybersecurity Survey',
        type: 'Primary Research',
        reliability: 89,
        description: 'Survey of 400+ healthcare IT professionals on IoT security.',
        lastUpdated: '2024-08-18T00:00:00Z'
      }
    ]
  }
];

const getReports = async ({ page = 1, limit = 10, filters = {} }) => {

  let filteredReports = [...mockReports];

  if (filters.type) {
    filteredReports = filteredReports.filter(report => 
      report.reportType.toLowerCase().includes(filters.type.toLowerCase())
    );
  }

  if (filters.industry) {
    filteredReports = filteredReports.filter(report => 
      report.industry.toLowerCase().includes(filters.industry.toLowerCase())
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredReports = filteredReports.filter(report => 
      report.title.toLowerCase().includes(searchTerm) ||
      report.summary.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.confidence) {
    filteredReports = filteredReports.filter(report => {
      const score = report.confidenceScore;
      switch (filters.confidence) {
        case 'high':
          return score >= 80 && score <= 100;
        case 'medium':
          return score >= 60 && score < 80;
        case 'low':
          return score >= 0 && score < 60;
        case 'all':
        default:
          return true;
      }
    });
  }

  const total = filteredReports.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

  return {
    reports: paginatedReports,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: endIndex < total
    }
  };
};

const getReportById = async (id) => {


  return mockReports.find(report => report.id === id);
};


const getFilterOptions = async () => {

  const reportTypes = [...new Set(mockReports.map(report => report.reportType))];
  const industries = [...new Set(mockReports.map(report => report.industry))];
  const confidenceRanges = [
    { label: 'All Confidence Levels', value: 'all' },
    { label: 'High (80-100%)', value: 'high' },
    { label: 'Medium (60-79%)', value: 'medium' },
    { label: 'Low (0-59%)', value: 'low' }
  ];

  return {
    reportTypes,
    industries,
    confidenceRanges
  };
};

module.exports = {
  getReports,
  getReportById,
  getFilterOptions
};
