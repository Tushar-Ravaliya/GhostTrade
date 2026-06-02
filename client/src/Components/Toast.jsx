import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, X } from "lucide-react";
import useToast from "../store/useToast";

const ToastItem = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (toast.duration <= 0) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - toast.createdAt;
      const remaining = Math.max(0, 100 - (elapsed / toast.duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [toast.duration, toast.createdAt]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`relative w-80 bg-white rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 ${
        exiting ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
      } ${isSuccess ? "border-primary/20" : "border-danger/20"}`}
      style={{ animation: "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              isSuccess ? "bg-primary-50" : "bg-danger-light"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 size={18} className="text-primary" />
            ) : (
              <XCircle size={18} className="text-danger" />
            )}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary leading-snug">
              {toast.title}
            </p>
            {toast.description && (
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                {toast.description}
              </p>
            )}
            {toast.action && (
              <Link
                to={toast.action.href}
                onClick={handleClose}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark mt-2 transition-colors"
              >
                {toast.action.label} →
              </Link>
            )}
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            className="text-text-muted hover:text-text-secondary transition-colors p-0.5 shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {toast.duration > 0 && (
        <div className="h-0.5 bg-surface-tertiary">
          <div
            className={`h-full transition-all duration-100 ease-linear rounded-full ${
              isSuccess ? "bg-primary" : "bg-danger"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
}
