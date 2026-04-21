
import prisma from "../common/prisma.js";

export const createBooking = (body, userID) => {
  return prisma.bookings.create({
    data: { ...body, userID }
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