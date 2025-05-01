// const express = require('express');
// const authController = require('../controllers/auth.controller');
import express from 'express';
import * as loginController from '../controller/loginController.js'
const router = express.Router();


router.post('/', loginController.login);
router.get('/', loginController.doingNothing)

// module.exports = router;
export default router;
