import { body, validationResult } from 'express-validator';

//Middleware to validate users
export const validateUsers = [
  body('name')
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 3 }).withMessage('Name must have at least 3 characters.'),
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Email format not valid.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must have at least 8 characters'),
  
  // Middleware to handle errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];