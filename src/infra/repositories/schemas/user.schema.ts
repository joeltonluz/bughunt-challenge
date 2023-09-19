import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    type: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    collection: 'User',
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);
