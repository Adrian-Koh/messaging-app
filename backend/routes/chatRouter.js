const { Router } = require("express");
const chatRouter = Router();
const chatController = require("../controllers/chatController");
const verifyToken = require("../lib/jwtUtils");

module.exports = chatRouter;
