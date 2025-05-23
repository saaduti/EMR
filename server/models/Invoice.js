import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
});

const insuranceClaimSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true
  },
  policyNumber: {
    type: String,
    required: true
  },
  claimNumber: String,
  submissionDate: Date,
  status: {
    type: String,
    enum: ['Submitted', 'In Review', 'Approved', 'Denied', 'Partially Approved'],
    default: 'Submitted'
  },
  approvedAmount: Number,
  denialReason: String
});

const invoiceSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visit',
    required: true
  },
  items: [invoiceItemSchema],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
    default: 'Draft'
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Insurance', 'Cash', 'Check']
  },
  insuranceClaim: insuranceClaimSchema,
  datePaid: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;