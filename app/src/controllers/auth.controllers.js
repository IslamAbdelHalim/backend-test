import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { AppError, catchError } from '../utils/catchError.js';

// function to generate token
function generateToken(user) {
  const token_secret = process.env.JWT_TOKEN_SECRET;
  const expireIn = process.env.EXPIRE_IN;

  return jwt.sign({ id: user._id }, token_secret, { expiresIn: expireIn });
}

/**
 * @desc Signup new User
 * @method POST
 * @route /signup
 * @access public
 */
export const signup = catchError(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = generateToken(user);

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

/**
 * @desc Login User
 * @method POST
 * @route /login
 * @access public
 */
export const login = catchError(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please Provide Email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !bcrypt.compare(password, user.password)) {
    return next(new AppError('Incorrect Email or Password', 400));
  }

  const token = generateToken(user);

  res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

/**
 * @desc change the Role of use
 * @method PATCH
 * @route /change-role
 * @access private(admin)
 */
export const changeRole = catchError(async (req, res, next) => {
  const { email, role } = req.body;

  if (!email || !role)
    return next(new AppError('Please Provide the Email and Role'));

  const user = await User.findOneAndUpdate(
    { email: email },
    { role: role },
    { new: true }
  );

  if (!user) return next(new AppError('user is not exist'));

  res.status(200).json({
    status: 'success',
    user,
  });
});
