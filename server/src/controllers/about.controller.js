import { asyncHandler } from '../utils/async-handler.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { aboutModel } from '../models/about.model.js';

// GET /api/v1/about — Fetch about page data (public)
const getAbout = asyncHandler(async (req, res) => {
  let about = await aboutModel.findOne();

  // If no document exists, seed default data
  if (!about) {
    about = await aboutModel.create({
      heroTitle: 'Trade With Complete Confidence',
      heroSubtitle:
        'Our comprehensive security infrastructure ensures every transaction is safe, authenticated, and backed by industry-leading protection.',
      features: [
        {
          title: 'Escrow Protection',
          description:
            'Funds are held securely until both parties confirm the transaction is complete, protecting buyers and sellers alike.',
          badge: 'Essential',
          icon: 'Shield',
          order: 1,
        },
        {
          title: 'Verified Sellers',
          description:
            'Multi-step verification process including ID verification, address confirmation, and trading history review.',
          badge: 'Trust',
          icon: 'UserCheck',
          order: 2,
        },
        {
          title: 'End-to-End Encryption',
          description:
            'All communications and transactions are encrypted using bank-level security protocols.',
          badge: 'Security',
          icon: 'Lock',
          order: 3,
        },
        {
          title: 'Authentication Services',
          description:
            'Partner with leading authentication services to verify every transaction and account activity.',
          badge: 'Quality',
          icon: 'FileCheck',
          order: 4,
        },
        {
          title: 'Fraud Detection',
          description:
            'Advanced AI-powered systems monitor all transactions for suspicious activity in real-time.',
          badge: 'Protection',
          icon: 'Eye',
          order: 5,
        },
        {
          title: 'Dispute Resolution',
          description:
            'Dedicated team of experts to mediate and resolve any disputes fairly and efficiently.',
          badge: 'Support',
          icon: 'Scale',
          order: 6,
        },
        {
          title: 'Secure Payments',
          description:
            'Multiple secure payment options including cards, bank transfers, and cryptocurrency.',
          badge: 'Flexible',
          icon: 'CreditCard',
          order: 7,
        },
        {
          title: 'Two-Factor Auth',
          description:
            'Optional 2FA adds an extra layer of security to your account and transactions.',
          badge: 'Control',
          icon: 'Fingerprint',
          order: 8,
        },
      ],
    });
  }

  return res.status(200).json(new ApiResponse(200, about, 'About data fetched successfully'));
});

// PUT /api/v1/about — Update about page data (admin)
const updateAbout = asyncHandler(async (req, res) => {
  const { heroTitle, heroSubtitle, features } = req.body;

  let about = await aboutModel.findOne();

  if (!about) {
    about = new aboutModel();
  }

  if (heroTitle) about.heroTitle = heroTitle;
  if (heroSubtitle) about.heroSubtitle = heroSubtitle;
  if (features && Array.isArray(features)) about.features = features;

  await about.save();

  return res.status(200).json(new ApiResponse(200, about, 'About page updated successfully'));
});

export { getAbout, updateAbout };
