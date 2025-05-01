// const express = require('express');
import express from 'express';
const router = express.Router();
// const controller = require('../controller/shoppingcartController.js ');
import * as controller from '../controller/shoppingcartController.js';
router.get('/', controller.getAllCarts);
router.get('/:userId', controller.getCartByUserId);
router.post('/', controller.createOrUpdateCart);
router.delete('/:userId', controller.deleteCart);
router.get('/:bookID/:userName', controller.addBook);
router.get('/forShoppingCart/:userName/books', controller.getALlBookInCart);
router.get('/forDelete/:userName/:bookID', controller.getBookInCartForDelete);



export default router;
