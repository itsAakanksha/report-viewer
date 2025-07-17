const { v4: uuidv4 } = require('uuid');

const traceMiddleware = (req, res, next) => {
  const traceId = req.headers['x-trace-id'] || uuidv4();
  req.traceId = traceId;
  res.set('X-Trace-Id', traceId);
  next();
};

module.exports = { traceMiddleware };
