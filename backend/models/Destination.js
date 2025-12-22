const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  categoryId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  bestTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  guidelines: [{
    type: String,
    required: true
  }],
  highlights: [{
    type: String,
    required: true
  }],
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      default: 'Madhya Pradesh, India'
    }
  }
}, {
  timestamps: true
});

// Index for faster queries (slug already indexed via unique: true)
destinationSchema.index({ categoryId: 1 });

module.exports = mongoose.model('Destination', destinationSchema);

