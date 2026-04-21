
// import * as service from "../services/booking.service.js";

// export const createBooking = async (req, res) => {
//   res.send(await service.createBooking(req.body, req.user.userID));
// };

// export const getBookings = async (req, res) => {
//   res.send(await service.getBookings(req.user.userID));
// };

import * as service from "../services/booking.service.js";

export const createBooking = async (req, res) => {
  res.send(await service.createBooking(req.body, req.user.userID));
};

export const getBookings = async (req, res) => {
  res.send(await service.getBookings(req.user.userID));
};

// 🔥 THÊM DELETE
export const deleteBooking = async (req, res) => {
  const id = Number(req.params.id);

  const data = await service.deleteBooking(id);
  res.send({
    message: "Delete booking successfully",
    data,
  });
};