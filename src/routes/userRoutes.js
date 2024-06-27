const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/user', UserController.listUsers);
router.get('/user/:userId', UserController.getUserById);
router.post('/user', UserController.createUser);
router.put('/user/:userId', UserController.updateUser);
router.delete('/user/:userId', UserController.softDeleteUser);

module.exports = router;
