import mongoos, { Schema } from 'mongoose';

const userScheama = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobileNo: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted', 'banned'],
      default: 'inactive',
    },

    refreshToken: {
      type: String,
    },

    forgotPasswordToken: {
      type: String,
    },

    forgotPasswordExpiry: {
      type: Date,
    },

    balance: {
      type: Number,
      default: 100000,
    },
  },
  { timestamps: true }
);

export const User = mongoos.model('User', userScheama);
