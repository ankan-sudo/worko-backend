const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user', async () => {
    const res = await request(app)
      .post('/worko/user')
      .auth('admin', 'adminpass')
      .send({
        email: 'test@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '10001'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toMatchObject({
      email: 'test@example.com',
      name: 'John Doe',
      age: 30,
      city: 'New York',
      zipCode: '10001'
    });
  });

  it('should get a user by ID', async () => {
    const user = new User({
      email: 'test@example.com',
      name: 'John Doe',
      age: 30,
      city: 'New York',
      zipCode: '10001'
    });
    await user.save();

    const res = await request(app).get(`/worko/user/${user._id}`).auth('admin', 'adminpass')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', user._id.toString());
    expect(res.body).toMatchObject({
      email: 'test@example.com',
      name: 'John Doe',
      age: 30,
      city: 'New York',
      zipCode: '10001'
    });
  });

  it('should list all users', async () => {
    const user1 = new User({
      email: 'test1@example.com',
      name: 'John Doe',
      age: 30,
      city: 'New York',
      zipCode: '10001'
    });
    const user2 = new User({
      email: 'test2@example.com',
      name: 'Jane Doe',
      age: 28,
      city: 'San Francisco',
      zipCode: '94105'
    });
    await user1.save();
    await user2.save();

    const res = await request(app).get('/worko/user').auth('admin', 'adminpass');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0]).toHaveProperty('_id', user1._id.toString());
    expect(res.body[1]).toHaveProperty('_id', user2._id.toString());
  });

  it('should update a user', async () => {
    const user = new User({
      _id : '667d2585d780f7ca7abc68d4',
      email: 'test@example.com',
      name: 'John Doe',
      age: 30,
      city: 'New York',
      zipCode: '10001'
    });
    await user.save();

    const res = await request(app)
      .put(`/worko/user/${user._id}`).auth('admin', 'adminpass')
      .send({
        email: 'updated@example.com',
        name: 'John Smith',
        age: 35,
        city: 'Los Angeles',
        zipCode: '90001'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', user._id.toString());
    expect(res.body).toMatchObject({
      email: 'updated@example.com',
      name: 'John Smith',
      age: 35,
      city: 'Los Angeles',
      zipCode: '90001'
    });
  });

  it('should soft delete a user', async () => {
    const user = new User({
      email: 'test@example.com',
      name: 'John Doe',
      age: 30,
      city: 'New York',
      zipCode: '10001'
    });
    await user.save();

    const res = await request(app).delete(`/worko/user/${user._id}`).auth('admin', 'adminpass');
    expect(res.statusCode).toEqual(204);

    const deletedUser = await User.findById(user._id);
    expect(deletedUser.isDeleted).toBe(true);
  });

  
});
