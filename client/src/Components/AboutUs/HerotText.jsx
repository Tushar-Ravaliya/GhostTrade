import React from 'react';

export default function HeroText({ title, subtitle, loading }) {
  return (
    <section className="bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <h2 className="font-frijole font-normal antialiased text-3xl md:text-4xl lg:text-5xl tracking-widest text-white mb-6 uppercase">
            {loading ? (
              <span className="inline-block w-80 h-12 bg-gray-700 rounded animate-pulse" />
            ) : (
              title || 'Trade With Complete Confidence'
            )}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
            {loading ? (
              <span className="inline-block w-full max-w-xl h-6 bg-gray-700 rounded animate-pulse" />
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