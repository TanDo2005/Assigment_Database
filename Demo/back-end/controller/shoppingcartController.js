// const db = require('../models');
import * as db from '../models/index.js';
import express from 'express';
const ShoppingCart = db.ShoppingCart;
import { sql } from '../config/db.js';
const router = express.Router();

export const getAllCarts = async (req, res) => {
  try {
    const carts = await sql`
      SELECT * FROM shoppingcart
      JOIN "User" ON shoppingcart."userid" = "User"."customerid"
      ORDER BY UserID ASC
    `;

    res.status(200).json({ success: true, data: carts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const addBook = async (req, res) => {
  //UPATE shoppingcart SET bookid = array_append(bookid, :new_book_id) WHERE userid = :user_idD
  const { bookID, userName } = req.params;

  try {
    console.log("UserName", userName);
    const userId = await sql`
      SELECT "customerid" FROM "User" WHERE "username" = ${userName}`

    console.log("userID", userId[0].customerid);
    console.log("BOOKID:", bookID);

    if (userId.length === 0) {
      return res.status(404).json({ success:false, message: 'User not found' });

    }
    // Check if the cart already exists for the user and book
    const booksFound = await sql`
      SELECT * FROM shoppingcart WHERE "userid" = ${userId[0].customerid} AND ${bookID} = ANY(bookid)`;
    if (booksFound.length > 0) {
      console.log("Book already exists in cart");
      return res.status(400).json({ success:false, message: 'Book already exists in cart' });
    }

    const cart = await sql`
      SELECT * FROM shoppingcart WHERE "userid" = ${userId[0].customerid}
    `;
    if (cart.length === 0) {
      console.log("cart not found");
      return res.status(404).json({success:false, message: 'Cart not found' });
    }
    // Update the cart with the new book ID
    await sql`
      UPDATE shoppingcart SET "bookid" = array_append("bookid", ${bookID}) WHERE "userid" = ${userId[0].customerid}
    `;
    res.status(200).json({ success: true, message: 'Book added to cart' });
  } catch (err) {
    console.log("Error adding book to cart", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await sql` 
    SELECT * FROM shoppingcart
    JOIN "User" ON shoppingcart."userid" = "User"."customerid"
    WHERE shoppingcart."userid" = ${userId}
    `;

    if (cart.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createOrUpdateCart = async (req, res) => {
  const { UserID, BookID, Price } = req.body;
  try {
    if (!UserID || !BookID || !Price) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    // Check if the cart already exists for the user
    const existingCart = await sql`
      SELECT * FROM shoppingcart WHERE "userid" = ${UserID} 
    `;
    if (existingCart.length > 0) {
      // Update the existing cart
      await sql`
        UPDATE shoppingcart SET "bookid" = ${BookID}, "price" = ${Price} WHERE "userid" = ${UserID}
      `;
      return res.status(200).json({ success: true, message: 'Cart updated successfully' });
    }

    // Create a new cart if it doesn't exist
    await sql`
      INSERT INTO shoppingcart ("userid", "bookid", "price") VALUES (${UserID}, ${BookID}, ${Price})
    `;
    res.status(201).json({ success: true, message: 'Cart created successfully' });

  } catch (err) {
    res.status(400).json({ success: true, error: err.message });
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


