// server/models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      // Reference to the User model
    required: true,
  },
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
