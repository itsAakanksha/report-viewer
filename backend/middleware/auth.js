const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'key';

const ROLES = {
  VIEWER: 'viewer',
  REVIEWER: 'reviewer'
};


const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '60d' });
};


const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied',
      message: 'No token provided'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      error: 'Invalid token',
      message: error.message
    });
  }
};


const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'No token provided'
      });
    }

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
    } catch (error) {
      return res.status(403).json({ 
        error: 'Invalid token',
        message: error.message
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`
      });
    }
    
    next();
  };
};


const requireReviewer = authorizeRoles([ROLES.REVIEWER]);
const requireViewer = authorizeRoles([ROLES.VIEWER, ROLES.REVIEWER]);


module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  authorizeRoles,
  requireReviewer,
  requireViewer,
  ROLES
};
