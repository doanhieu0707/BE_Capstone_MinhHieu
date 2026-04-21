import express from "express";
import {
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
} from "../controllers/room.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Lấy danh sách phòng (có phân trang + search)
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: villa
 *     responses:
 *       200:
 *         description: Danh sách phòng
 */
router.get("/", getRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Lấy chi tiết phòng
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của phòng
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/:id", getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Tạo phòng
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 example: Villa biển
 *               price:
 *                 type: number
 *                 example: 100
 *               location:
 *                 type: string
 *                 example: Đà Nẵng
 *               description:
 *                 type: string
 *                 example: View đẹp
 */
router.post("/", verifyToken, createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Cập nhật phòng
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID phòng
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *                 example: Villa VIP
 *               price:
 *                 type: number
 *                 example: 500
 *               location:
 *                 type: string
 *                 example: Đà Nẵng
 *               description:
 *                 type: string
 *                 example: Phòng xịn
 *     responses:
 *       200:
 *         description: OK
 */
router.put("/:id", verifyToken, updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Xóa phòng
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID phòng cần xóa
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy phòng
 */
router.delete("/:id", verifyToken, deleteRoom);

export default router;
