import { asyncHandler } from '../utils/async-handler.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { userModel } from '../models/user.models.js';
import imagekit from '../config/imagekit.config.js';

// GET /api/v1/user/me - Get current user profile
const getMe = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json(new ApiError(404, 'User not found'));
  }

  return res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

// PUT /api/v1/user/update-profile - Update name only (email & mobileNo are disabled)
const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json(new ApiError(400, 'Name is required'));
  }

  const user = await userModel
    .findByIdAndUpdate(req.user.id, { name: name.trim() }, { new: true })
    .select('-password');

  if (!user) {
    return res.status(404).json(new ApiError(404, 'User not found'));
  }

  return res.status(200).json(new ApiResponse(200, user, 'Profile updated successfully'));
});

// PUT /api/v1/user/upload-photo - Upload profile photo via ImageKit
const uploadPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json(new ApiError(400, 'No file uploaded'));
  }

  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json(new ApiError(404, 'User not found'));
  }

  // Upload to ImageKit
  const result = await imagekit.upload({
    file: req.file.buffer.toString('base64'),
    fileName: `profile_${req.user.id}_${Date.now()}`,
    folder: '/ghosttrade/profiles',
  });

  // Update user's profilePhoto
  user.profilePhoto = result.url;
  await user.save();

  const updatedUser = await userModel.findById(req.user.id).select('-password');

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, 'Profile photo updated successfully'));
});

// PUT /api/v1/user/change-password
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json(new ApiError(400, 'All password fields are required'));
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json(new ApiError(400, 'New password and confirm password do not match'));
  }

  if (newPassword.length < 6) {
    return res.status(400).json(new ApiError(400, 'Password must be at least 6 characters'));
  }

  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json(new ApiError(404, 'User not found'));
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json(new ApiError(400, 'Current password is incorrect'));
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(new ApiResponse(200, null, 'Password changed successfully'));
});

export { getMe, updateProfile, uploadPhoto, changePassword };
