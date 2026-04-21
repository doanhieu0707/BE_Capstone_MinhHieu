// import * as service from "../services/room.service.js";

// export const getRooms = async (req, res) => {
//   try {
//     const data = await service.getRooms(req.query);
//     res.send(data);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// export const getRoomById = async (req, res) => {
//   const id = Number(req.params.id);
//   res.send(await service.getRoomById(id));
// };

// export const createRoom = async (req, res) => {
//   res.send(await service.createRoom(req.body, req.user.userID));
// };

// export const updateRoom = async (req, res) => {
//   const id = Number(req.params.id);
//   res.send(await service.updateRoom(id, req.body));
// };

// export const deleteRoom = async (req, res) => {
//   const id = Number(req.params.id);
//   res.send(await service.deleteRoom(id));
// };

import * as service from "../services/room.service.js";

// GET ALL
export const getRooms = async (req, res) => {
  try {
    const data = await service.getRooms(req.query);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// GET BY ID
export const getRoomById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await service.getRoomById(id);

    if (!data) {
      return res.status(404).send("Room not found");
    }

    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// CREATE
export const createRoom = async (req, res) => {
  try {
    console.log("USER:", req.user); // 🔥 debug

    const data = await service.createRoom(req.body, req.user.userID);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// UPDATE
export const updateRoom = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await service.updateRoom(id, req.body);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// DELETE
export const deleteRoom = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await service.deleteRoom(id);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};