import { body, validationResult } from 'express-validator';

import { AppError } from '../utils/catchError.js';

export const validateAddProduct = [
  body('name')
    .notEmpty()
    .withMessage('Product must has a name')
    .isString()
    .withMessage('Product Name must be a string'),
  body('category')
    .optional()
    .isString()
    .withMessage('Product Name must be a string'),
  body('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Product must has a price')
    .isFloat({ min: 0 })
    .withMessage('price must be a positive number'),
  body('quantity')
    .optional()
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage('price must be a positive number'),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      const msg = error.array()[0].msg;
      return next(new AppError(msg, 400));
    }

    next();
  },
];

export const validateUpdateProduct = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Product must has a name')
    .isString()
    .withMessage('Product Name must be a string'),
  body('category')
    .optional()
    .isString()
    .withMessage('Product Name must be a string'),
  body('price')
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage('Product must has a price')
    .isFloat({ min: 0 })
    .withMessage('price must be a positive number'),
  body('quantity')
    .optional()
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage('price must be a positive number'),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      const msg = error.array()[0].msg;
      return next(new AppError(msg, 400));
    }

    next();
  },
];
