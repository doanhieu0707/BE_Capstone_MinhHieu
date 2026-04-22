import prisma from "../common/prisma.js";

// Lấy tất cả phòng
// GET /api/rooms
export const getRooms = async (query) => {
    const { page = 1, pageSize = 5, search = "" } = query;

    const skip = (page - 1) * pageSize;

    const where = {
        roomName: {
            contains: search,
        },
    };

    const [items, total] = await Promise.all([
        prisma.rooms.findMany({
            where,
            skip: Number(skip),
            take: Number(pageSize),
            orderBy: { roomID: "desc" },
        }),
        prisma.rooms.count({ where }),
    ]);

    return {
        page: Number(page),
        pageSize: Number(pageSize),
        total,
        totalPage: Math.ceil(total / pageSize),
        items,
    };
};

// Lấy chi tiết phòng theo ID
export const getRoomById = (id) => {
    return prisma.rooms.findUnique({
        where: { roomID: id },
    });
};

// Tạo phòng
export const createRoom = (body, userID) => {
    return prisma.rooms.create({
        data: { ...body, userID },
    });
};

// Cập nhật phòng
export const updateRoom = (id, body) => {
    return prisma.rooms.update({
        where: { roomID: id },
        data: body,
    });
};

// Xóa phòng
export const deleteRoom = (id) => {
    return prisma.rooms.delete({
        where: { roomID: id },
    });
};
