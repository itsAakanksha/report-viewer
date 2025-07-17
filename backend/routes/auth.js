const express = require('express');
const { generateToken, ROLES } = require('../middleware/auth');

const router = express.Router();

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: ROLES.REVIEWER },
  { id: 2, username: 'viewer', password: 'viewer123', role: ROLES.VIEWER },
  { id: 3, username: 'reviewer', password: 'reviewer123', role: ROLES.REVIEWER }
];

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid username or password'
      });
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred during login'
    });
  }
});

module.exports = router;
