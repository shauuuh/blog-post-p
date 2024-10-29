import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, res, next) => {
  const token =  req.headers['authorization']?.split(' ')[1];


  if(!token) return res.status(401).json({ error: 'Access denied'});

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid Token '});
    req.user = user;
    next();
  });
};

export default authMiddleware;