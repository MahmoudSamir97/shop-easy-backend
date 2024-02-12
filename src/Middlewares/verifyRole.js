const jwt = require('jsonwebtoken');
const verifyRole = () => {
  return async function (req, res, next) {
    try {
      const { role } = req;
      if (role != 'admin') return res.status(403).json({ status: 'failed', message: 'You are not authorized!' });
      next();
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        err: err.message,
      });
    }
  };
};

module.exports = verifyRole;
