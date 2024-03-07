const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeaderString = req.headers.authorization;
  const token = authHeaderString.split(' ')[1];
  console.log(token);
  if (!token) return res.status(401).json({ status: 'failed', message: 'Missing authorized Token!' });
  const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = userId;
  req.role = role;
  next();
};

module.exports = authenticateToken;
