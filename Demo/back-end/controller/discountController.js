// const db = require('../models');'
import * as db from '../models/index.js';
const Discount = db.Discount;

export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.findAll();
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);
    discount ? res.json(discount) : res.status(404).json({ message: 'Discount not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDiscount = async (req, res) => {
  try {
    const newDiscount = await Discount.create(req.body);
    res.status(201).json(newDiscount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDiscount = async (req, res) => {
  try {
    const [updated] = await Discount.update(req.body, { where: { DiscountID: req.params.id } });
    updated ? res.json({ message: 'Discount updated' }) : res.status(404).json({ message: 'Discount not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDiscount = async (req, res) => {
  try {
    const deleted = await Discount.destroy({ where: { DiscountID: req.params.id } });
    deleted ? res.json({ message: 'Discount deleted' }) : res.status(404).json({ message: 'Discount not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
