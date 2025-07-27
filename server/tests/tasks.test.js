// tests/tasks.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import jwt from 'jsonwebtoken';

let token;
let user;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Create a test user
  user = new User({
    username: 'test',
    email: `test_${Date.now()}@example.com`,
    password: '123456',
  });
  await user.save();

  // Generate JWT for the test user
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  // Clean up test users and their tasks
  const testUsers = await User.find({ email: /test_/ }, '_id');
  const testUserIds = testUsers.map((u) => u._id);

  await Task.deleteMany({ user: { $in: testUserIds } }); // Clear tasks created by test users
  await User.deleteMany({ _id: { $in: testUserIds } });

  await mongoose.connection.close();
});

describe('POST /api/tasks', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Test Task', user: user._id });

    expect(res.statusCode).toBe(201); // 201 Created
    expect(res.body.text).toBe('Test Task');
  });
});
