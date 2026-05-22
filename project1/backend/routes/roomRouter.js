const express = require('express')
const roomRouter = express.Router();

const roomController = require('../controller/roomController')

roomRouter.get("/:roomId", roomController.roomGet);
roomRouter.post("/", roomController.roomPost);

module.exports = roomRouter;