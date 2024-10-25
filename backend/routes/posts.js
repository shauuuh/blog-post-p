import express from "express";
import { createPost, getAllPosts, getUserPosts } from "../controllers/postController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/post', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/user', authMiddleware, getUserPosts)

export default router;