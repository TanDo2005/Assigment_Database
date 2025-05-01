// const express = require('express');
// const orderController = require('../controllers/orders.controller');
import express from 'express';
import * as orderController from '../controller/ordersController.js';
const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.post('/user', orderController.getOrdersByUserName);

// module.exports = router;
export default router;
