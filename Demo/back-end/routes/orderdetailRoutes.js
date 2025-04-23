// const express = require('express');
// const controller = require('../controllers/orderdetail.controller');\
import express from 'express';
import * as orderDetailController from '../controller/orderdetailController.js';
const router = express.Router();

router.get('/', orderDetailController.getAllOrderDetails);
router.get('/:orderId/:bookId/:userId', orderDetailController.getOrderDetail);
router.post('/', orderDetailController.createOrderDetail);
router.put('/:orderId/:bookId/:userId', orderDetailController.updateOrderDetail);
router.delete('/:orderId/:bookId/:userId', orderDetailController.deleteOrderDetail);

// module.exports = router;
export default router;
