import * as service from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const data = await service.register(req.body);
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const data = await service.login(req.body);
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("No refresh token");

    const data = await service.refreshToken(token);

    res.send(data);
  } catch (err) {
    res.status(401).send(err.message);
  }
};