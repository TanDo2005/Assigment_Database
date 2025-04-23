// const db = require('../models');
import * as db from '../models/index.js';
const Shipment = db.Shipment;

export const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findByPk(req.params.id);
    shipment ? res.json(shipment) : res.status(404).json({ message: 'Shipment not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    res.status(201).json(shipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateShipment = async (req, res) => {
  try {
    const [updated] = await Shipment.update(req.body, { where: { OrderID: req.params.id } });
    updated ? res.json({ message: 'Shipment updated' }) : res.status(404).json({ message: 'Shipment not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteShipment = async (req, res) => {
  try {
    const deleted = await Shipment.destroy({ where: { OrderID: req.params.id } });
    deleted ? res.json({ message: 'Shipment deleted' }) : res.status(404).json({ message: 'Shipment not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
