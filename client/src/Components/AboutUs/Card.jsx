import React from "react";
import {
  Shield,
  UserCheck,
  Lock,
  FileCheck,
  Eye,
  Scale,
  CreditCard,
  Fingerprint,
  HelpCircle,
} from "lucide-react";

// Map icon string names from DB to actual lucide-react components
const iconMap = {
  Shield: <Shield size={24} />,
  UserCheck: <UserCheck size={24} />,
  Lock: <Lock size={24} />,
  FileCheck: <FileCheck size={24} />,
  Eye: <Eye size={24} />,
  Scale: <Scale size={24} />,
  CreditCard: <CreditCard size={24} />,
  Fingerprint: <Fingerprint size={24} />,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || <HelpCircle size={24} />;
};

export default function Card({ features = [], loading }) {
  const sortedFeatures = [...features].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (loading) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-border rounded-2xl p-6 animate-shimmer h-48" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sortedFeatures.length === 0) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-muted text-lg">No features available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedFeatures.map((feature, index) => (
            <div
              key={feature._id || index}
              className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-primary">
                  {getIcon(feature.icon)}
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 bg-surface-tertiary text-text-muted rounded-md uppercase tracking-wide">
                  {feature.badge}
                </span>
              </div>

              {/* Card Body */}
              <h3 className="text-base font-bold mb-2 text-text-primary">
                {feature.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
