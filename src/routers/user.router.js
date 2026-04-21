import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Người dùng
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Lấy profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin user thành công
 */
router.get("/profile", verifyToken, getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Cập nhật profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Nguyen Van A
 *               phone:
 *                 type: string
 *                 example: 0901234567
 *               avatar:
 *                 type: string
 *                 example: https://image.com/avatar.jpg
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/profile", verifyToken, updateProfile);

export default router;