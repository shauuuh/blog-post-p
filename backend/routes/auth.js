import express from "express";
import { register, login } from '../controllers/authController.js';
import { validateUsers } from '../middleware/userDataValidation.js';

const router = express.Router()

router.post('/register', validateUsers, register);
router.post('/login',login);

export default router;
