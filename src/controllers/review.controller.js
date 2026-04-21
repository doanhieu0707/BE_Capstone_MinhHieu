
import * as service from "../services/review.service.js";

export const createReview = async (req, res) => {
  res.send(await service.createReview(req.body, req.user.userID));
};

export const getReviews = async (req, res) => {
  res.send(await service.getReviews(Number(req.params.roomId)));
};
