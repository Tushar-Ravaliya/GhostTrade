import mongoose, { Schema } from 'mongoose';

const portfolioSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    avgBuyPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    totalInvested: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Compound index: one portfolio entry per user per symbol
portfolioSchema.index({ user: 1, symbol: 1 }, { unique: true });

export const portfolioModel = mongoose.model('Portfolio', portfolioSchema);
