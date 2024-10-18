import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, res, next) => {
  const token =  req.header('Authorization');

  if(!token) {
    return res.status(401).json({ error: 'Access denied'});
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.id;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token'});
  }
};

export default authMiddleware;