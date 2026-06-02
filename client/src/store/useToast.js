import { create } from 'zustand';

let toastId = 0;

const useToast = create((set, get) => ({
  toasts: [],

  addToast: (type, title, description, action = null, duration = 5000) => {
    const id = ++toastId;
    const toast = { id, type, title, description, action, duration, createdAt: Date.now() };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAll: () => {
    set({ toasts: [] });
  },
}));

export default useToast;
