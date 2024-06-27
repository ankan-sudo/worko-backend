const UserService = require('../services/userService');
const { validateUser, validateId } = require('../utils/validator');

class UserController {
  static async listUsers(req, res) {
    const users = await UserService.listUsers();
    res.status(200).json(users);
  }

  static async getUserById(req, res) {
    const { userId } = req.params;
    validateId(userId);
    const user = await UserService.getUserById(userId);
    res.status(200).json(user);
  }

  static async createUser(req, res) {
    validateUser(req.body);
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  }

  static async updateUser(req, res) {
    const { userId } = req.params;
    validateId(userId);
    validateUser(req.body);
    const updatedUser = await UserService.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  }

  static async softDeleteUser(req, res) {
    const { userId } = req.params;
    validateId(userId);
    await UserService.softDeleteUser(userId);
    res.status(204).send();
  }
}

module.exports = UserController;
