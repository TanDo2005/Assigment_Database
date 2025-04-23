// const express = require('express');
// const controller = require('../controllers/shipment.controller');
import express from 'express';
import * as controller from '../controller/shipmentController.js';

const router = express.Router();
router.get('/', controller.getAllShipments);
router.get('/:id', controller.getShipmentById);
router.post('/', controller.createShipment);
router.put('/:id', controller.updateShipment);
router.delete('/:id', controller.deleteShipment);

// module.exports = router;
export default router;