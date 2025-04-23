// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/discountController.js');
import express from 'express';
import * as controller from '../controller/discountController.js';

const router = express.Router();

router.get('/', controller.getAllDiscounts);
router.get('/:id', controller.getDiscountById);
router.post('/', controller.createDiscount);
router.put('/:id', controller.updateDiscount);
router.delete('/:id', controller.deleteDiscount);

// module.exports = router;
export default router;
