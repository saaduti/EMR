import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15
  },
  type: {
    type: String,
    enum: ['Initial Visit', 'Follow-up', 'Consultation', 'Procedure'],
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Checked-in', 'In-progress', 'Completed', 'Cancelled', 'No-show'],
    default: 'Scheduled'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;