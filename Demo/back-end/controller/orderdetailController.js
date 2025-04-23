// const db = require('../models');
import * as db from '../models/index.js';
const OrderDetail = db.OrderDetail;

export const getAllOrderDetails = async (req, res) => {
  try {
    const details = await OrderDetail.findAll();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderDetail = async (req, res) => {
  const { orderId, bookId, userId } = req.params;
  try {
    const detail = await OrderDetail.findOne({
      where: { OrderID: orderId, BookID: bookId, UserID: userId }
    });
    detail ? res.json(detail) : res.status(404).json({ message: 'Order detail not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOrderDetail = async (req, res) => {
  try {
    const newDetail = await OrderDetail.create(req.body);
    res.status(201).json(newDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateOrderDetail = async (req, res) => {
  const { orderId, bookId, userId } = req.params;
  try {
    const [updated] = await OrderDetail.update(req.body, {
      where: { OrderID: orderId, BookID: bookId, UserID: userId }
    });
    updated ? res.json({ message: 'Order detail updated' }) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrderDetail = async (req, res) => {
  const { orderId, bookId, userId } = req.params;
  try {
    const deleted = await OrderDetail.destroy({
      where: { OrderID: orderId, BookID: bookId, UserID: userId }
    });
    deleted ? res.json({ message: 'Order detail deleted' }) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
