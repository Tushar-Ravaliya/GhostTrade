import React, { useState, useEffect, useRef } from 'react';
import useAuthStore from '../store/useAuthStore';
import { Camera, Check, X, Loader2, Eye, EyeOff } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile, uploadPhoto, changePassword } = useAuthStore();

  // Profile form state
  const [name, setName] = useState('');
  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });
  const [profileLoading, setProfileLoading] = useState(false);

  // Photo upload state
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoMsg, setPhotoMsg] = useState({ text: '', type: '' });
  const fileInputRef = useRef(null);

  // Password form state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  // Handle profile update (name only)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMsg({ text: '', type: '' });
    setProfileLoading(true);
    try {
      await updateProfile(name);
      setProfileMsg({ text: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setProfileMsg({
        text: err.response?.data?.message || 'Failed to update profile',
        type: 'error',
      });
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setPhotoMsg({ text: 'Please select an image file', type: 'error' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoMsg({ text: 'File size must be under 5MB', type: 'error' });
      return;
    }

    setPhotoMsg({ text: '', type: '' });
    setPhotoLoading(true);
    try {
      await uploadPhoto(file);
      setPhotoMsg({ text: 'Photo updated successfully!', type: 'success' });
    } catch (err) {
      setPhotoMsg({
        text: err.response?.data?.message || 'Failed to upload photo',
        type: 'error',
      });
    } finally {
      setPhotoLoading(false);
      setTimeout(() => setPhotoMsg({ text: '', type: '' }), 3000);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg({ text: '', type: '' });

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMsg({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    if (passwords.newPassword.length < 6) {
      setPasswordMsg({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(
        passwords.currentPassword,
        passwords.newPassword,
        passwords.confirmPassword
      );
      setPasswordMsg({ text: 'Password changed successfully!', type: 'success' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordMsg({
        text: err.response?.data?.message || 'Failed to change password',
        type: 'error',
      });
    } finally {
      setPasswordLoading(false);
      setTimeout(() => setPasswordMsg({ text: '', type: '' }), 4000);
    }
  };

  const defaultAvatar = 'Images/profileImg.jpeg';
  const avatarSrc = user?.profilePhoto || defaultAvatar;

  return (
    <div className='min-h-screen w-full'>
      <h2 className='text-white font-bold text-2xl md:text-3xl px-5 md:px-10 mt-6'>Profile Setting</h2>

      <div className='text-white px-5 md:px-10 py-6 w-full max-w-9xl'>

        {/* ── Profile Photo Section ── */}
        <div className='flex flex-col md:flex-row items-center gap-6 md:gap-10 border-b border-gray-800 pb-8'>
          <div className='relative group'>
            <img
              className='rounded-full h-24 w-24 md:h-28 md:w-28 object-cover border-2 border-white p-1 transition-transform group-hover:scale-105'
              src={avatarSrc}
              alt="Profile"
            />
            {photoLoading && (
              <div className='absolute inset-0 bg-black/60 rounded-full flex items-center justify-center'>
                <Loader2 className='animate-spin text-white' size={28} />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={photoLoading}
              className='absolute bottom-0 right-0 bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors shadow-lg'
            >
              <Camera size={16} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className='hidden'
            />
          </div>
          <div className='flex flex-col gap-3 text-center md:text-left'>
            <h3 className='text-lg font-semibold'>{user?.name || 'User'}</h3>
            <p className='text-gray-400 text-sm md:text-base'>JPG, GIF, or PNG. Max 5MB.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={photoLoading}
              className='bg-gray-800 hover:bg-gray-700 transition-colors rounded-md py-2 px-6 w-full md:w-fit disabled:opacity-50'
            >
              {photoLoading ? 'Uploading...' : 'Upload Photo'}
            </button>
            {photoMsg.text && (
              <p className={`text-sm ${photoMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {photoMsg.text}
              </p>
            )}
          </div>
        </div>

        {/* ── Profile Info Section ── */}
        <form onSubmit={handleProfileUpdate} className='flex flex-col gap-2 text-white font-semibold py-8'>
          <h3>Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full border-gray-700 text-gray-300 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent'
            placeholder='Your Name'
          />

          <h3 className='mt-5'>Email</h3>
          <input
            type="text"
            value={user?.email || ''}
            disabled
            className='w-full border-gray-700 text-gray-500 p-2.5 border-b bg-transparent cursor-not-allowed opacity-60'
            placeholder='Email'
          />

          <h3 className='mt-5'>Mobile Number</h3>
          <input
            type="text"
            value={user?.mobileNo || ''}
            disabled
            className='w-full border-gray-700 text-gray-500 p-2.5 border-b bg-transparent cursor-not-allowed opacity-60'
            placeholder='Mobile Number'
          />

          {profileMsg.text && (
            <p className={`text-sm mt-2 ${profileMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {profileMsg.text}
            </p>
          )}

          <button
            type='submit'
            disabled={profileLoading}
            className='border border-white hover:bg-white hover:text-black transition-all mt-6 rounded-lg py-2 w-full md:w-1/5 self-end disabled:opacity-50'
          >
            {profileLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        {/* ── Password Change Section ── */}
        <form onSubmit={handlePasswordChange} className='flex flex-col gap-2 text-gray-400 font-semibold py-8 border-t border-gray-800'>
          <h2 className='font-bold text-2xl md:text-3xl text-white mb-4'>Password Change</h2>

          <h3 className='mt-3'>Current Password</h3>
          <div className='relative'>
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className='w-full border-gray-600 text-gray-400 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent pr-10'
              placeholder='Current Password'
              required
            />
            <button
              type='button'
              onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300'
            >
              {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <h3 className='mt-5'>New Password</h3>
          <div className='relative'>
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className='w-full border-gray-600 text-gray-400 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent pr-10'
              placeholder='New Password'
              required
            />
            <button
              type='button'
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300'
            >
              {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <h3 className='mt-5'>Confirm Password</h3>
          <div className='relative'>
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              className='w-full border-gray-600 text-gray-400 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent pr-10'
              placeholder='Confirm Password'
              required
            />
            <button
              type='button'
              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300'
            >
              {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {passwordMsg.text && (
            <p className={`text-sm mt-2 ${passwordMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {passwordMsg.text}
            </p>
          )}

          <button
            type='submit'
            disabled={passwordLoading}
            className='border border-white hover:bg-white hover:text-black transition-all mt-6 rounded-lg py-2 w-full md:w-1/5 self-end disabled:opacity-50'
          >
            {passwordLoading ? 'Changing...' : 'Change Password'}
          </button>
        </form>

        {/* ── Account Deletion Section ── */}
        <div className='flex flex-col gap-4 py-8 border-t border-gray-800 mb-10'>
          <h2 className='font-bold text-2xl md:text-3xl text-white'>Account Deletion</h2>
          <p className='text-gray-500 w-full md:w-2/3 lg:w-1/2'>
            If you ever want to delete your account, you can. The process will take 30 days and you can change your mind at any time and halt the process.
          </p>
          <button className='border border-red-600 text-red-600 hover:bg-red-600/20 transition-all mt-3 rounded-lg py-2 w-full md:w-1/5'>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
