import mongoose from 'mongoose';

const labResultSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  referenceRange: String,
  interpretation: {
    type: String,
    enum: ['Normal', 'Abnormal', 'Critical', 'Inconclusive'],
    required: true
  },
  notes: String
});

const labReportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  orderingPhysicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  labName: {
    type: String,
    required: true
  },
  collectionDate: {
    type: Date,
    required: true
  },
  reportDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Ordered', 'Collected', 'In Process', 'Completed', 'Reviewed'],
    default: 'Ordered'
  },
  category: {
    type: String,
    enum: ['Blood', 'Urine', 'Imaging', 'Pathology', 'Other'],
    required: true
  },
  results: [labResultSchema],
  notes: String,
  documentUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Lab = mongoose.model('Lab', labReportSchema);

export default Lab;