import { asyncHandler } from '../utils/async-handler.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { userModel } from '../models/user.models.js';
import jwt from 'jsonwebtoken';


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobileNo } = req.body;
  const existingUser = await userModel.findOne({ $or: [{ email }, { mobileNo }] });

  console.log(name, email, password, mobileNo);

  if (existingUser) {
    return res
      .status(400)
      .json(
        new ApiError(400, { message: 'User with this email or mobile number already exists' })
      );
  }

  const user = await userModel.create({ name, email, password, mobileNo });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token);

  return res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, mobileNo, password } = req.body;

  if (!email && !mobileNo) {
    return res
      .status(400)
      .json(new ApiError(400, { message: 'Email or mobile number is required' }));
  }

  const user = await userModel.findOne({
    $or: [{ email }, { mobileNo }],
  });

  if (!user) {
    return res
      .status(400)
      .json(new ApiError(400, { message: 'Invalid email or mobile number' }));
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json(new ApiError(400, { message: 'Invalid password' }));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token);

  return res.status(200).json(new ApiResponse(200, { user, token }, 'User logged in successfully'));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.status(200).json(new ApiResponse(200, null, 'User logged out successfully'));
});

export { registerUser, loginUser, logoutUser };
