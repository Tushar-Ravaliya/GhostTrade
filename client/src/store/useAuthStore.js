import { create } from 'zustand';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/v1';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  // Fetch current user from /me endpoint
  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API_BASE}/user/me`, {
        withCredentials: true,
      });
      if (res.data.statusCode === 200) {
        set({ user: res.data.data, isAuthenticated: true, loading: false });
      }
    } catch (err) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  // Set user after login/register
  setUser: (user) => {
    set({ user, isAuthenticated: true, loading: false });
  },

  // Update user profile (name only)
  updateProfile: async (name) => {
    const res = await axios.put(
      `${API_BASE}/user/update-profile`,
      { name },
      { withCredentials: true }
    );
    if (res.data.statusCode === 200) {
      set({ user: res.data.data });
    }
    return res.data;
  },

  // Upload profile photo
  uploadPhoto: async (file) => {
    const formData = new FormData();
    formData.append('profilePhoto', file);
    const res = await axios.put(`${API_BASE}/user/upload-photo`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.data.statusCode === 200) {
      set({ user: res.data.data });
    }
    return res.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    const res = await axios.put(
      `${API_BASE}/user/change-password`,
      { currentPassword, newPassword, confirmPassword },
      { withCredentials: true }
    );
    return res.data;
  },

  // Logout
  logout: async () => {
    try {
      await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));

export default useAuthStore;
