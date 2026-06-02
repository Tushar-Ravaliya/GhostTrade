import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

const HeroText = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-surface-secondary via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-full">
              <TrendingUp size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Live Market Data</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
            Track Markets.
            <br />
            <span className="text-primary italic">Invest Smarter.</span>
          </h1>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Real-time stock data, market insights, and powerful tools to help you stay ahead.
          </p>

          <Link
            to="/market"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <TrendingUp size={18} />
            Explore Markets
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none hidden lg:block" />
      <div className="absolute bottom-0 right-20 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none hidden lg:block" />
    </div>
  );
};

export default HeroText;
