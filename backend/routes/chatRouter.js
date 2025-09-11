const { Router } = require("express");
const chatRouter = Router();
const chatController = require("../controllers/chatController");
const verifyToken = require("../utils/jwtUtils");

chatRouter.get("/", verifyToken, chatController.chatGet);
chatRouter.get("/:userId", verifyToken, chatController.chatWithUserGet);
chatRouter.post("/:userId", verifyToken, chatController.chatPost);

module.exports = chatRouter;
