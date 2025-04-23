// const db = require('../models');
import * as db from '../models/index.js';
import express from 'express';
const ShoppingCart = db.ShoppingCart;
const router = express.Router();

export const getAllCarts = async (req, res) => {
  try {
    const carts = await ShoppingCart.findAll();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne({ where: { UserID: req.params.userId } });
    cart ? res.json(cart) : res.status(404).json({ message: 'Cart not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOrUpdateCart = async (req, res) => {
  const { UserID, BookID, Price } = req.body;
  try {
    const [cart, created] = await ShoppingCart.upsert({ UserID, BookID, Price });
    res.status(201).json({ message: created ? 'Cart created' : 'Cart updated', cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const deleted = await ShoppingCart.destroy({ where: { UserID: req.params.userId } });
    deleted ? res.json({ message: 'Cart deleted' }) : res.status(404).json({ message: 'Cart not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
