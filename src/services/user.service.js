import prisma from "../common/prisma.js";

export const getProfile = (userID) => {
  return prisma.users.findUnique({
    where: { userID },
  });
};

export const updateProfile = (userID, body) => {
  return prisma.users.update({
    where: { userID },
    data: body,
  });
};