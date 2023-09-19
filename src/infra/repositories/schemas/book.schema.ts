import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    available: {
      type: Boolean,
      default: true,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    collection: 'Book',
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);
