// const db = require('../models');
import * as db from '../models/index.js';
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
const User = db.User;

export const login = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await User.findOne({ where: { Username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

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
    res.status(500).json({ error: err.message });
  }
};
