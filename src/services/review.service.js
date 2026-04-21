
import prisma from "../common/prisma.js";

export const createReview = (body, userID) => {
  return prisma.reviews.create({
    data: { ...body, userID }
  });
};

export const getReviews = (roomID) => {
  return prisma.reviews.findMany({ where: { roomID } });
};
