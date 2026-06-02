import React from 'react';

export default function HeroText({ title, subtitle, loading }) {
  return (
    <section className="bg-gradient-to-br from-surface-secondary via-white to-primary-50 pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">
            {loading ? (
              <span className="inline-block w-80 h-12 bg-surface-tertiary rounded-xl animate-shimmer" />
            ) : (
              title || 'Trade With Complete Confidence'
            )}
          </h1>
          <p className="max-w-3xl mx-auto text-text-secondary text-sm md:text-base lg:text-lg leading-relaxed">
            {loading ? (
              <span className="inline-block w-full max-w-xl h-6 bg-surface-tertiary rounded-lg animate-shimmer" />
            ) : (
              subtitle ||
              'Our comprehensive security infrastructure ensures every transaction is safe, authenticated, and backed by industry-leading protection.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}