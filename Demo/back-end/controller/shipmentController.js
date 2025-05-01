// const db = require('../models');
import * as db from '../models/index.js';
import { sql } from '../config/db.js';
const Shipment = db.Shipment;

export const getAllShipments = async (req, res) => {
  try {
    // const shipments = await Shipment.findAll();
    const shipments = await sql `
      SELECT * FROM Shipments
      ORDER BY OrderID ASC;`;
      res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    // const shipment = await Shipment.findByPk(req.params.id);
    // shipment ? res.json(shipment) : res.status(404).json({ message: 'Shipment not found' });
    const shipment = await sql `
      SELECT * FROM Shipments WHERE OrderID = ${req.params.id}
    `;
    if (shipment.length === 0) {
      return res.status(404).json({ success: false, message: 'Shipment not found!' });
    }
    res.status(200).json({ success: true, data: shipment[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createShipment = async (req, res) => {
  try {
    // const shipment = await Shipment.create(req.body);
    // res.status(201).json(shipment);
    const { OrderID, ShipmentDate, DeliveryDate, Status } = req.body;
    if (!OrderID || !ShipmentDate || !DeliveryDate || !Status) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }
    const shipment = await sql `
      INSERT INTO Shipments (OrderID, ShipmentDate, DeliveryDate, Status)
      VALUES (${OrderID}, ${ShipmentDate}, ${DeliveryDate}, ${Status})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: shipment[0] });
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateShipment = async (req, res) => {
  try {
    const { OrderID, ShipmentDate, DeliveryDate, Status } = req.body;
    if (!OrderID || !ShipmentDate || !DeliveryDate || !Status) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    // const [updated] = await Shipment.update(req.body, { where: { OrderID: req.params.id } });
    // updated ? res.json({ message: 'Shipment updated' }) : res.status(404).json({ message: 'Shipment not found' });

    const updated = await sql `
      UPDATE Shipments
      SET ShipmentDate = ${ShipmentDate}, DeliveryDate = ${DeliveryDate}, Status = ${Status}
      WHERE OrderID = ${req.params.id}
      RETURNING *
      `;
    if (updated.length === 0) {
      return res.status(404).json({ success: false, message: 'Shipment not found!' });
    }

    res.status(200).json({ success: true, data: updated[0] });
  // res.status(200).json({ success: true, message: 'Shipment updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteShipment = async (req, res) => {
  try {
    // const deleted = await Shipment.destroy({ where: { OrderID: req.params.id } });
    // deleted ? res.json({ message: 'Shipment deleted' }) : res.status(404).json({ message: 'Shipment not found' });
    const deleted = await sql `
      DELETE FROM Shipments WHERE OrderID = ${req.params.id}
      RETURNING *
    `;
    if (deleted.length === 0) {
      return res.status(404).json({ success: false, message: 'Shipment not found!' });
    }
    res.status(200).json({ success: true, message: 'Shipment deleted successfully' });
  // res.status(200).json({ success: true, message: 'Shipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
