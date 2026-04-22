import express from "express";
import {
  createBooking,
  getBookings,
  deleteBooking,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Đặt phòng
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Đặt phòng
 *     tags: [Bookings]
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
 *               - checkIn
 *               - checkOut
 *               - guests
 *             properties:
 *               roomID:
 *                 type: integer
 *                 example: 1
 *               checkIn:
 *                 type: string
 *                 example: 2026-05-01
 *               checkOut:
 *                 type: string
 *                 example: 2026-05-05
 *     responses:
 *       200:
 *         description: Đặt phòng thành công
 */
router.post("/", verifyToken, createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Lấy lịch sử đặt phòng
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách booking
 */
router.get("/", verifyToken, getBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Hủy booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của booking
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Xóa booking thành công
 */
router.delete("/:id", verifyToken, deleteBooking);

export default router;