// const db = require('../models');
import * as db from '../models/index.js';
import { sql } from '../config/db.js';
const Order = db.Order;
const User = db.User;

export const getAllOrders = async (req, res) => {
  // try {
  //   const orders = await Order.findAll({
  //     include: [{ model: User, attributes: ['Username', 'Email'] }]
  //   });
  //   res.json(orders);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  try {
    const orders = await sql`
      SELECT * FROM Orders 
      ORDER BY OrderID ASC
    `;
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  // try {
  //   const order = await Order.findByPk(req.params.id, {
  //     include: [{ model: User, attributes: ['Username', 'Email'] }]
  //   });
  //   order ? res.json(order) : res.status(404).json({ message: 'Order not found' });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  const { id } = req.params;
  try {
    const order = await sql`
      SELECT * FROM Orders WHERE OrderID = ${id}
    `;
    if (order.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found!' });
    }
    res.status(200).json({ success: true, data: order[0] });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createOrder = async (req, res) => {
  // try {
  //   const newOrder = await Order.create(req.body);
  //   res.status(201).json(newOrder);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
  /* INSERT INTO orders (userid, booksprice, shipfee, totalprice, status, paidmethod)
VALUES */
  const { UserID, BooksPrice, ShipFee, TotalPrice, Status, PaidMethod } = req.body;
  if (!UserID || !BooksPrice || !ShipFee || !TotalPrice || !Status || !PaidMethod) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }
  try {
    const newOrder = await sql`
      INSERT INTO Orders (UserID, BooksPrice, ShipFee, TotalPrice, Status, PaidMethod)
      VALUES (${UserID}, ${BooksPrice}, ${ShipFee}, ${TotalPrice}, ${Status}, ${PaidMethod})
    `;
    res.status(201).json({ success: true, data: newOrder[0] });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(400).json({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, { where: { OrderID: req.params.id } });
    updated ? res.json({ message: 'Order updated' }) : res.status(404).json({ message: 'Order not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { OrderID: req.params.id } });
    deleted ? res.json({ message: 'Order deleted' }) : res.status(404).json({ message: 'Order not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrdersByUserName = async (req, res) => {
  const { username } = req.params;
  try {
    const orders = await sql`
      SELECT * FROM Orders 
      WHERE UserID IN (SELECT customerid FROM "User" WHERE username = ${username})
    `;
    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found for this user!' });
    }
    console.log("orders", orders);
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error('Error fetching orders by username:', err);
    res.status(500).json({ error: err.message });
  }

}

export const createOrderWithDetails = async (req, res) => {

  const { quantities, shipMent, status, PaidMethod, totalPriceBooks, userName, shoppingCartDetail } = req.body;

  //INSERT INTO orders (userid, booksprice, shipfee, totalprice, status, paidmethod)

  //INSERT INTO orderdetail (orderid, bookid, userid, quantity, price, shipmentid)
  console.log("shoppingCart", shoppingCartDetail);
  console.log("quantities", quantities);
  console.log("shipMent", shipMent);
  console.log("status", status);
  console.log("PaidMethod", PaidMethod);
  console.log("totalPriceBooks", totalPriceBooks);
  if (!shoppingCartDetail || !quantities || !status || !PaidMethod || !userName || !totalPriceBooks) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {

    const userID = await sql`
  SELECT "customerid" FROM "User" WHERE "username" = ${userName};
`;

    if (userID.length === 0) {
      console.error('User not found:', userName);
      return res.status(404).json({ success: false, message: 'User not found!' });
    }
  } catch (err) {
    console.error('Error fetching user ID:', err);
    return res.status(500).json({ error: err.message });
  }

  const userID = await sql`
  SELECT "customerid" FROM "User" WHERE "username" = ${userName};`


  //shopingcartdetail = array of books details
  //quantities = array of quantities-> id : quantity
  //shipMent = boolean
  //status = string
  //PaidMethod = string

  // const totalOverallPrice = totalPriceBooks + shipMent ? 5000 : 0;
  const totalOverallPrice = totalPriceBooks + 5000;
  
  try {
    const newShipment = await sql`
      INSERT INTO shipment (shipmentdate, deliverydate)
      VALUES (CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days')
      RETURNING orderid
    `;
    console.log("newShipment", newShipment);
    const order = await sql`
    INSERT INTO orders (userid, booksprice, shipfee, totalprice, status, paidmethod)
    VALUES (${userID[0].customerid}, ${totalPriceBooks}, ${shipMent ? 5000 : 0}, ${totalOverallPrice}, ${status}, ${PaidMethod})
    RETURNING orderid, userid, booksprice, shipfee, totalprice, status, paidmethod
    `;
    console.log("order", order);
    
    /*new_shipment AS (
  INSERT INTO shipment (shipmentdate, deliverydate)
  VALUES (CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days')
  RETURNING orderid
) */

    for (let i = 0; i < shoppingCartDetail.length; i++) {
      const bookID = shoppingCartDetail[i].id;
      const quantity = quantities[bookID];
      const price = shoppingCartDetail[i].price;
      // const shipmentID = shipMent ? 1 : null; // Assuming shipment ID is 1 if shipped, null otherwise
      const shipmentID = newShipment[0].orderid; // Assuming shipment ID is 1 if shipped, null otherwise
      console.log("bookID", bookID);
      console.log("quantity", quantity);
      console.log("price", price);
      console.log("shipmentID", shipmentID);

      await sql`
        INSERT INTO orderdetail (orderid, bookid, userid, quantity, price, shipmentid)
        VALUES (${order[0].orderid}, ${bookID}, ${userID[0].customerid}, ${quantity}, ${price}, ${shipmentID})
      `;

    }

    //change array bookid to []

    const backtoNormal = await sql`
   UPDATE shoppingcart SET bookid = ARRAY[]::integer[] 
    WHERE "userid" = ${userID[0].customerid}
    `;

    console.log("order", order);
    const orderID = order[0].orderid;
    console.log("orderID", orderID);


  } catch (err) {
    console.error('Error creating order:', err);
    return res.status(400).json({ error: err.message });
  }
}
