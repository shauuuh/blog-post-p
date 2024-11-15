import express from "express";
import { createPost, getAllPosts, getUserPosts, editPost, deletePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/post', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/user', authMiddleware, getUserPosts);
router.put('/edit/:postId', authMiddleware, editPost);
router.delete('/delete/:postId', authMiddleware, deletePost);

export default router;