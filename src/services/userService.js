const UserDAO = require('../dao/userDAO');

class UserService {
  static async listUsers() {
    return UserDAO.listUsers();
  }

  static async getUserById(userId) {
    return UserDAO.getUserById(userId);
  }

  static async createUser(userData) {
    return UserDAO.createUser(userData);
  }

  static async updateUser(userId, userData) {
    return UserDAO.updateUser(userId, userData);
  }

  static async softDeleteUser(userId) {
    return UserDAO.softDeleteUser(userId);
  }
}

module.exports = UserService;
