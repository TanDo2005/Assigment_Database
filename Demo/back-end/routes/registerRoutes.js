import express from 'express';
import { register } from '../controller/registerController.js';

const router = express.Router();

router.post('/', register);
router.get('/', (req, res) => {
  res.send('Register route is working!');
});

export default router;