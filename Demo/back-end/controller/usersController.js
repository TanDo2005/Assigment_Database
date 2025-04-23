// const db = require('../models');
import * as db from '../models/index.js';
const User = db.User;
const Customer = db.Customer;
const Seller = db.Seller;
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Customer, Seller]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Customer, Seller]
    });
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  const { role, customer, seller, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(userData.Password, 10);

  try {
    const newUser = await User.create({ ...userData, Password: hashedPassword });

    if (role === 'customer' && customer) {
      await Customer.create({ CustomerID: newUser.CustomerID, ...customer });
    }

    if (role === 'seller' && seller) {
      await Seller.create({ CustomerID: newUser.CustomerID, ...seller });
    }

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { CustomerID: req.params.id } });
    updated ? res.json({ message: 'User updated' }) : res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Cascade delete customer/seller data
    await Customer.destroy({ where: { CustomerID: req.params.id } });
    await Seller.destroy({ where: { CustomerID: req.params.id } });

    const deleted = await User.destroy({ where: { CustomerID: req.params.id } });
    deleted ? res.json({ message: 'User deleted' }) : res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
