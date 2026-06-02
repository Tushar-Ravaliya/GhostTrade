import React, { useState, useEffect, useRef } from 'react';
import useAuthStore from '../store/useAuthStore';
import { Camera, Loader2, Eye, EyeOff } from 'lucide-react';

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

  const inputClasses = "w-full border border-border rounded-xl px-4 py-3 text-text-primary bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-sm";
  const disabledInputClasses = "w-full border border-border rounded-xl px-4 py-3 text-text-muted bg-surface-tertiary cursor-not-allowed text-sm";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Profile Settings</h1>

      {/* Profile Photo Section */}
      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <img
              className="rounded-full h-24 w-24 object-cover border-2 border-border transition-transform group-hover:scale-105"
              src={avatarSrc}
              alt="Profile"
            />
            {photoLoading && (
              <div className="absolute inset-0 bg-white/80 rounded-full flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={24} />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={photoLoading}
              className="absolute bottom-0 right-0 bg-primary hover:bg-primary-dark p-2 rounded-full transition-colors shadow-md text-white"
            >
              <Camera size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-text-primary">{user?.name || 'User'}</h3>
            <p className="text-text-muted text-sm">JPG, GIF, or PNG. Max 5MB.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={photoLoading}
              className="bg-surface-tertiary hover:bg-surface-secondary text-text-secondary transition-colors rounded-lg py-2 px-5 text-sm font-medium disabled:opacity-50"
            >
              {photoLoading ? 'Uploading...' : 'Upload Photo'}
            </button>
            {photoMsg.text && (
              <p className={`text-xs ${photoMsg.type === 'success' ? 'text-primary' : 'text-danger'}`}>
                {photoMsg.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <h2 className="text-lg font-bold text-text-primary mb-5">Personal Information</h2>
        <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Email</label>
            <input
              type="text"
              value={user?.email || ''}
              disabled
              className={disabledInputClasses}
              placeholder="Email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Mobile Number</label>
            <input
              type="text"
              value={user?.mobileNo || ''}
              disabled
              className={disabledInputClasses}
              placeholder="Mobile Number"
            />
          </div>

          {profileMsg.text && (
            <p className={`text-sm ${profileMsg.type === 'success' ? 'text-primary' : 'text-danger'}`}>
              {profileMsg.text}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={profileLoading}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              {profileLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <h2 className="text-lg font-bold text-text-primary mb-5">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className={`${inputClasses} pr-10`}
                placeholder="Current Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className={`${inputClasses} pr-10`}
                placeholder="New Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-secondary mb-1.5 block">Confirm Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className={`${inputClasses} pr-10`}
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {passwordMsg.text && (
            <p className={`text-sm ${passwordMsg.type === 'success' ? 'text-primary' : 'text-danger'}`}>
              {passwordMsg.text}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              {passwordLoading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Account Deletion Section */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-text-primary mb-2">Account Deletion</h2>
        <p className="text-text-muted text-sm mb-4 max-w-lg">
          If you ever want to delete your account, you can. The process will take 30 days and you can change your mind at any time and halt the process.
        </p>
        <button className="border border-danger text-danger hover:bg-danger-light transition-colors rounded-xl py-2.5 px-6 text-sm font-semibold">
          Delete Account
        </button>
      </div>
    </div>
  );
}
