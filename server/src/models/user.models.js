import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
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

    profilePhoto: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted', 'banned'],
      default: 'active',
    },

    // refreshToken: {
    //   type: String,
    // },

    // forgotPasswordToken: {
    //   type: String,
    // },

    // forgotPasswordExpiry: {
    //   type: Date,
    // },

    balance: {
      type: Number,
      default: 100000,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const userModel = mongoose.model('User', userSchema);
