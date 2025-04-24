// const db = require('../models');'
import * as db from '../models/index.js';
const Discount = db.Discount;
import { sql } from '../config/db.js';

export const getAllDiscounts = async (req, res) => {
  try {
    // const discounts = await Discount.findAll();
    const discounts = await sql`
      SELECT * FROM Discounts
      ORDER BY DiscountID ASC
    `;
    res.status(200).json({ success: true, data: discounts });
    // res.json(discounts);
  } catch (err) {
    console.error('Error fetching discounts:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getDiscountById = async (req, res) => {

  const { id } = req.params;
  try {
    // const discount = await Discount.findByPk(req.params.id);
    // discount ? res.json(discount) : res.status(404).json({ message: 'Discount not found' });

    const discount = await sql`
      SELECT * FROM Discounts WHERE DiscountID = ${id}
    `;
    if (discount.length === 0) {
      return res.status(404).json({ success: false, message: 'Discount not found!' });
    }
    res.status(200).json({ success: true, data: discount[0] });
  } catch (err) {
    console.error('Error fetching discount:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createDiscount = async (req, res) => {
  const { bookid, discountpercentage, startdate, enddate } = req.body;
  if (!bookid || !discountpercentage || !startdate || !enddate) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }
  try {
    // const newDiscount = await Discount.create(req.body);
    // res.status(201).json(newDiscount);
    const newDiscount = await sql`
      INSERT INTO Discounts (BookID, DiscountPercentage, StartDate, EndDate)
      VALUES (${bookid}, ${discountpercentage}, ${startdate}, ${enddate})
    `;
    res.status(201).json({ success: true, message: 'Discount created successfully' });
  } catch (err) {
    console.error('Error creating discount:', err);
    res.status(400).json({ error: err.message });
  }
};

export const updateDiscount = async (req, res) => {
  const { id } = req.params;

  const { bookid, discountpercentage, startdate, enddate } = req.body;
  if (!bookid || !discountpercentage || !startdate || !enddate) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }


  try {
    // const [updated] = await Discount.update(req.body, { where: { DiscountID: req.params.id } });
    // updated ? res.json({ message: 'Discount updated' }) : res.status(404).json({ message: 'Discount not found' });
    const updatedDiscount = await sql`
      UPDATE Discounts
      SET BookID = ${bookid}, DiscountPercentage = ${discountpercentage}, StartDate = ${startdate}, EndDate = ${enddate}
      WHERE DiscountID = ${id}
    `;

    if (updatedDiscount.length === 0) {
      return res.status(404).json({ success: false, message: 'Discount not found' });
    }

    res.status(200).json({ success: true, message: 'Discount updated successfully' });
  } catch (err) {
    console.error('Error updating discount:', err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteDiscount = async (req, res) => {
  // try {
  //   const deleted = await Discount.destroy({ where: { DiscountID: req.params.id } });
  //   deleted ? res.json({ message: 'Discount deleted' }) : res.status(404).json({ message: 'Discount not found' });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  const { id } = req.params;
  try {
    const deletedDiscount = await sql`
      DELETE FROM Discounts WHERE DiscountID = ${id}
    `;
    if (deletedDiscount.length === 0) {
      return res.status(404).json({ success: false, message: 'Discount not found' });
    }
    res.status(200).json({ success: true, message: 'Discount deleted successfully' });
  } catch (err) {
    console.error('Error deleting discount:', err);
    res.status(500).json({ error: err.message });
  }
};
