import { body, validationResult } from 'express-validator';
import { AppError } from '../utils/catchError.js';

export const validateUser = [
  body('username')
    .notEmpty()
    .escape()
    .withMessage('Please Enter Username')
    .isString(),
  body('email')
    .notEmpty()
    .isString()
    .withMessage('Please provide a Valid Email')
    .escape()
    .isEmail()
    .withMessage('Please Enter a valid Email'),
  body('password')
    .isLength({ min: 6 })
    .notEmpty()
    .isString()
    .withMessage('password must be at least 6 character'),
  body('confirmPassword')
    .notEmpty()
    .isString()
    .withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        new AppError('Passwords are not the Same', 400);
      }

      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const msg = errors.array()[0].msg;
      return next(new AppError(msg, 400));
    }
    next();
  },
];
