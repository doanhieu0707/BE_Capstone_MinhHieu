import prisma from "../common/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 🔐 TẠO TOKEN
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userID: user.userID },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" } // 🔥 ngắn
  );

  const refreshToken = jwt.sign(
    { userID: user.userID },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // 🔥 dài
  );

  return { accessToken, refreshToken };
};

// REGISTER
export const register = async (body) => {
  const exist = await prisma.users.findUnique({
    where: { email: body.email },
  });

  if (exist) throw new Error("Email already exists");

  const hash = bcrypt.hashSync(body.password, 10);

  return prisma.users.create({
    data: { ...body, password: hash },
  });
};

// LOGIN
export const login = async (body) => {
  const user = await prisma.users.findUnique({
    where: { email: body.email },
  });

  if (!user) throw new Error("User not found");

  const valid = bcrypt.compareSync(body.password, user.password);
  if (!valid) throw new Error("Wrong password");

  const tokens = generateTokens(user);

  return {
    ...tokens,
    user,
  };
};

// 🔥 REFRESH TOKEN
export const refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await prisma.users.findUnique({
      where: { userID: decoded.userID },
    });

    if (!user) throw new Error("User not found");

    const tokens = generateTokens(user);

    return tokens;
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};