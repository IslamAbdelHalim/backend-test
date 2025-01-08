import jwt from 'jsonwebtoken';
import promisify from 'util';

import Users from '../models/user.model.js';
import { AppError, catchError } from '../utils/catchError.js';

// middleware for implement protect route and sure that use is logged in
export const protectRoute = catchError(async (req, res, next) => {
  let token;
  let decode;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('you are not login please login', 401));

  try {
    decode = await promisify(jwt.verify)(token, process.env.JWT_TOKEN_SECRET);
  } catch (err) {
    return next(new AppError('Invalid Token please logged In', 401));
  }

  const user = await Users.findById(decode.id);

  if (!user) return next(new AppError('The User is not Exist', 401));

  req.user = user;

  next();
});

// middleware to insure from the role
export const checkRole = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not have The permission', 403));
    }

    next();
  };
};
