import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-border-light">
        <div className="flex items-center gap-2 text-text-muted text-xs">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p>Market data is for informational purposes only and not intended for trading or investment advice.</p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <span className="text-text-primary font-bold text-lg">
                Ghost<span className="text-primary">Trade</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              A powerful, risk-free environment for traders to sharpen their skills using real-time market data.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-text-primary text-sm mb-1">Quick Links</p>
            <Link to="/" className="text-text-muted text-sm hover:text-primary transition-colors">Home</Link>
            <Link to="/market" className="text-text-muted text-sm hover:text-primary transition-colors">Markets</Link>
            <Link to="/about" className="text-text-muted text-sm hover:text-primary transition-colors">About Us</Link>
            <Link to="/portfolio" className="text-text-muted text-sm hover:text-primary transition-colors">Portfolio</Link>
            <Link to="/history" className="text-text-muted text-sm hover:text-primary transition-colors">History</Link>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-text-primary text-sm mb-1">Services</p>
            <p className="text-text-muted text-sm">Real Time Data Streaming</p>
            <p className="text-text-muted text-sm">Risk Free Virtual Trading</p>
            <p className="text-text-muted text-sm">Advanced Portfolio Tracking</p>
            <p className="text-text-muted text-sm">Strategy Backtesting</p>
            <p className="text-text-muted text-sm">Educational Resources</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-text-primary text-sm mb-1">Contact Us</p>
            <p className="text-text-muted text-sm">66 Road Brooklyn Street, 600<br />New York, USA</p>
            <p className="text-text-muted text-sm">needhelp@company.com</p>
            <p className="text-primary font-semibold text-sm">+92 (666) 888 0000</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © 2026 GhostTrade. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-text-muted text-xs">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
