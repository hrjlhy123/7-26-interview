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
    ref: 'User',      // 关联到 User 模型
    required: true,
  },
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
