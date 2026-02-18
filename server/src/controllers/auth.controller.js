import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import { userModel } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
const registerUser = async (req, res) => {
  const { name, email, password, mobileNo } = req.body;
  const existingUser = await userModel.findOne({ $or: [{ email }, { mobileNo }] });

  if (existingUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, { message: 'User with this email or mobile number already exists' })
      );
  }

  const user = await userModel.create({ name, email, password, mobileNo });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token);

  return res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
};
