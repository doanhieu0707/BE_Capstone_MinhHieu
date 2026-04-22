
import prisma from "../common/prisma.js";

export const createBooking = async (body, userID) => {
  const { roomID, checkIn, checkOut, guests } = body;

  // 🔍 1. Check room tồn tại
  const room = await prisma.rooms.findUnique({
    where: { roomID: Number(roomID) },
  });

  if (!room) {
    throw new Error("Room không tồn tại");
  }

  // 🔥 2. Convert date đúng format Prisma
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (isNaN(checkInDate) || isNaN(checkOutDate)) {
    throw new Error("Sai format ngày");
  }

  // 🚀 3. Create booking
  return prisma.bookings.create({
    data: {
      userID,
      roomID: Number(roomID),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: Number(guests),
    },
  });
};

export const getBookings = (userID) => {
  return prisma.bookings.findMany({ where: { userID } });
};

export const deleteBooking = (id) => {
  return prisma.bookings.delete({
    where: { bookingID: id },
  });
};