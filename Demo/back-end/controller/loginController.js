// const db = require('../models');
import * as db from '../models/index.js';
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
const User = db.User;

import { sql } from '../config/db.js';

export const login = async (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }
  if(!Username.match(/^[a-zA-Z0-9]+$/)) {
    return res.status(400).json({ message: 'Username can only contain letters and numbers' });
  }
  if(!Password.match(/^[a-zA-Z0-9]+$/)) {
    return res.status(400).json({ message: 'Password can only contain letters and numbers' });
  }
  if (Password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  if (Password.length > 20) {
    return res.status(400).json({ message: 'Password must be at most 20 characters long' });
  }
  if (Username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }
  if (Username.length > 20) {
    return res.status(400).json({ message: 'Username must be at most 20 characters long' });
  }

  try {
    // const user = await User.findOne({ where: { Username } });
    // if (!user) return res.status(404).json({ message: 'User not found' });
    const user = await sql`
      SELECT * FROM Users WHERE Username = ${Username}
    `;
    if (user.length === 0) return res.status(404).json({ message: 'User not found' });

    // const isMatch = await bcrypt.compare(Password, user.Password);
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.CustomerID, username: user.Username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.CustomerID,
        username: user.Username,
        email: user.Email
      }
    });

  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: err.message });
  }
};
