import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { AppError } from '../utils/catchError.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// middleware to check confirm password and generate hashed password
userSchema.pre('save', async function (next) {
  if (this.password !== this.confirmPassword) {
    return next(new AppError('Passwords are not the Same', 400));
  }

  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

const Users = mongoose.model('users', userSchema);

export default Users;
