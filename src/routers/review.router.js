import express from "express";
import {
  createReview,
  getReviews,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Đánh giá phòng
 */

/**
 * @swagger
 * /api/reviews/{roomId}:
 *   get:
 *     summary: Lấy review theo phòng
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID của phòng
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Danh sách review
 */
router.get("/:roomId", getReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Tạo review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomID
 *               - rating
 *               - content
 *             properties:
 *               roomID:
 *                 type: integer
 *                 example: 1
 *               rating:
 *                 type: integer
 *                 example: 5
 *               content:
 *                 type: string
 *                 example: Phòng rất đẹp
 *     responses:
 *       200:
 *         description: Tạo review thành công
 */
router.post("/", verifyToken, createReview);

export default router;