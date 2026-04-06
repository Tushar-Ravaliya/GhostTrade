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
  Shield: <Shield size={30} />,
  UserCheck: <UserCheck size={30} />,
  Lock: <Lock size={30} />,
  FileCheck: <FileCheck size={30} />,
  Eye: <Eye size={30} />,
  Scale: <Scale size={30} />,
  CreditCard: <CreditCard size={30} />,
  Fingerprint: <Fingerprint size={30} />,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || <HelpCircle size={30} />;
};

export default function Card({ features = [], loading }) {
  // Sort features by order field
  const sortedFeatures = [...features].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (loading) {
    return (
      <section className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="border-2 border-gray-700 rounded-2xl p-6 bg-black animate-pulse"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-gray-700 rounded" />
                  <div className="w-16 h-6 bg-gray-700 rounded" />
                </div>
                <div className="h-5 bg-gray-700 rounded w-32 mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-800 rounded w-full" />
                  <div className="h-3 bg-gray-800 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sortedFeatures.length === 0) {
    return (
      <section className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-lg">No features available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedFeatures.map((feature, index) => (
            <div
              key={feature._id || index}
              className="border-2 border-gray-700 rounded-2xl p-6 hover:border-gray-500  duration-300 bg-black hover:translate-y-0.5 transition-all"
            >
              {/* Card Header: Icon & Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="text-white w-50">{getIcon(feature.icon)}</div>
                <span className="text-xs font-semibold px-3 py-1 border border-gray-600 rounded-md tracking-wide">
                  {feature.badge}
                </span>
              </div>

              {/* Card Body: Title & Description */}
              <h3 className="text-lg font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
