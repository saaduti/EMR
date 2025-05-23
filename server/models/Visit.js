import mongoose from 'mongoose';

const soapNoteSchema = new mongoose.Schema({
  subjective: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  assessment: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  }
});

const visitSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['Initial', 'Follow-up', 'Discharge'],
    required: true
  },
  notes: soapNoteSchema,
  status: {
    type: String,
    enum: ['Scheduled', 'Checked-in', 'In-progress', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  billingStatus: {
    type: String,
    enum: ['Unbilled', 'Billed', 'Paid', 'Denied'],
    default: 'Unbilled'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;