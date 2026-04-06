import mongoose, { Schema } from 'mongoose';

const featureSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  badge: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const aboutSchema = new Schema(
  {
    heroTitle: {
      type: String,
      required: true,
      trim: true,
    },
    heroSubtitle: {
      type: String,
      required: true,
      trim: true,
    },
    features: [featureSchema],
  },
  { timestamps: true }
);

export const aboutModel = mongoose.model('About', aboutSchema);
