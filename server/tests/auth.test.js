// tests/auth.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  // Remove test users with 'test_' prefix in their email
  await User.deleteMany({ email: /test_/ });
});

afterAll(async () => {
  // Clean up test users and their associated tasks
  const testUsers = await User.find({ email: /test_/ }, '_id');
  const testUserIds = testUsers.map(u => u._id);

  await User.deleteMany({ _id: { $in: testUserIds } });

  const Task = (await import('../models/Task.js')).default;
  await Task.deleteMany({ user: { $in: testUserIds } });

  await mongoose.connection.close();
});

describe('POST /api/register', () => {
  it('should return 400 for invalid email', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'testuser',
      email: 'invalid-email',
      password: '123456',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should return 201 for valid registration', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'testuser2',
      email: `test_${Date.now()}@example.com`, // ✅ Ensures unique email
      password: '123456',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });
});
