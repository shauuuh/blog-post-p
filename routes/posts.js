import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);

export default router;