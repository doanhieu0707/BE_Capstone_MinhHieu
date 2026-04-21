import * as service from "../services/user.service.js";

export const getProfile = async (req, res) => {
  const data = await service.getProfile(req.user.userID);
  res.send(data);
};

export const updateProfile = async (req, res) => {
  const data = await service.updateProfile(req.user.userID, req.body);
  res.send(data);
};