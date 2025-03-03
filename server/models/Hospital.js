import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Hospital image is required']
  },
  speciality: {
    type: [String],
    required: [true, 'At least one speciality is required']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  images: {
    type: [String],
    default: []
  },
  numberOfDoctors: {
    type: Number,
    required: [true, 'Number of doctors is required'],
    min: 0
  },
  numberOfDepartments: {
    type: Number,
    required: [true, 'Number of departments is required'],
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;