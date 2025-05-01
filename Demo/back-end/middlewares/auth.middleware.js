// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
//cua Minh
// exports.verifyToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // Expect Bearer <token>

//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // attach decoded info
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };


export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};