// const express = require('express');
import express from 'express';
const router = express.Router();
// const userController = require('../controllers/users.controller');
import * as userController from '../controller/usersController.js';
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// module.exports = router;
export default router;