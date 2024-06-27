const User = require('../models/user');

class UserDAO {
  static async listUsers() {
    return User.find({ isDeleted: false });
  }

  static async getUserById(userId) {
    return User.findById(userId);
  }

  static async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  static async updateUser(userId, userData) {
    return User.findByIdAndUpdate(userId, userData, { new: true });
  }

  static async softDeleteUser(userId) {
    return User.findByIdAndUpdate(userId, { isDeleted: true });
  }
}

module.exports = UserDAO;
