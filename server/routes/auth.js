import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['Doctor', 'Patient', 'Admin']).withMessage('Invalid role')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
], login);

router.get('/me', protect, getMe);

export default router;