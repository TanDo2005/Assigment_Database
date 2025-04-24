// const db = require('../models');
import * as db from '../models/index.js';
const Order = db.Order;
const User = db.User;

export const getAllOrders = async (req, res) => {
  // try {
  //   const orders = await Order.findAll({
  //     include: [{ model: User, attributes: ['Username', 'Email'] }]
  //   });
  //   res.json(orders);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  try {
    const orders = await sql`
      SELECT * FROM Orders
      ORDER BY OrderID ASC
    `;
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  // try {
  //   const order = await Order.findByPk(req.params.id, {
  //     include: [{ model: User, attributes: ['Username', 'Email'] }]
  //   });
  //   order ? res.json(order) : res.status(404).json({ message: 'Order not found' });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  const { id } = req.params;
  try {
    const order = await sql`
      SELECT * FROM Orders WHERE OrderID = ${id}
    `;
    if (order.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found!' });
    }
    res.status(200).json({ success: true, data: order[0] });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createOrder = async (req, res) => {
  // try {
  //   const newOrder = await Order.create(req.body);
  //   res.status(201).json(newOrder);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
  const { id } = req.params;
};

export const updateOrder = async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, { where: { OrderID: req.params.id } });
    updated ? res.json({ message: 'Order updated' }) : res.status(404).json({ message: 'Order not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { OrderID: req.params.id } });
    deleted ? res.json({ message: 'Order deleted' }) : res.status(404).json({ message: 'Order not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
