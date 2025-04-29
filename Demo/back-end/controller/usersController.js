// const db = require('../models');
import * as db from '../models/index.js';
const User = db.User;
const Customer = db.Customer;
const Seller = db.Seller;
import { sql } from '../config/db.js';
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    // const users = await User.findAll({ include: [Customer, Seller] });
    const users = await sql`
      SELECT * FROM Users
      ORDER BY CustomerID ASC
    `;
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try{
    const { id } = req.params;
    const User = await sql`
      SELECT * FROM Users WHERE CustomerID = ${id}
      `;

    if (User.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    res.status(200).json({ success: true, data: User[0] });
  }catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
    /*INSERT INTO "User" (username, password, dateofbirth, address, phone, email)
VALUES  */
  const { username, password, dateofbirth, address, phone, email, role, customer, seller } = req.body;
  if (!username || !password || !dateofbirth || !address || !phone || !email) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {
    // const newUser = await User.create({ ...userData, Password: hashedPassword });
    const newUser = await sql`
      INSERT INTO Users (Username, Password, DateOfBirth, Address, Phone, Email, Role)
      VALUES (${username}, ${password}, ${dateofbirth}, ${address}, ${phone}, ${email}, ${role})
      RETURNING CustomerID, Username, Email, DateOfBirth, Role
      `;

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
  const { id } = req.params;
  const { username, password, dateofbirth, address, phone, email } = req.body;
  if (!username || !password || !dateofbirth || !address || !phone || !email) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }
  // Kiểm tra định dạng dữ liệu
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    return res.status(400).json({ success: false, message: 'Username can only contain letters and numbers' });
  }
  if (password.length < 6 || password.length > 20) {
    return res.status(400).json({ success: false, message: 'Password must be between 6 and 20 characters long' });
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }
  
  try {
    const User = await sql`
      SELECT * FROM Users WHERE CustomerID = ${id}
    `;

    if (User.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await sql`
      UPDATE Users
      SET Username = ${username}, Password = ${password}, DateOfBirth = ${dateofbirth}, Address = ${address}, Phone = ${phone}, Email = ${email}
      WHERE CustomerID = ${id}
    `;
    if (updatedUser.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;  

  try {
    // Cascade delete customer/seller data
    await sql`
      DELETE FROM Sellers WHERE CustomerID = ${id};
      DELETE FROM Users WHERE CustomerID = ${id};
    `;
    const deletedUser = await sql`
      DELETE FROM Users WHERE CustomerID = ${id}
    `;
    if (deletedUser.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
