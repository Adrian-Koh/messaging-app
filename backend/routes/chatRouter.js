const { Router } = require("express");
const chatRouter = Router();
const chatController = require("../controllers/chatController");
const verifyToken = require("../utils/jwtUtils");

module.exports = chatRouter;
