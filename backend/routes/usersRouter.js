const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const profileController = require("../controllers/profileController");
const verifyToken = require("../utils/jwtUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const redis = require("../utils/redis");

usersRouter.get("/", verifyToken, usersController.usersGet);
usersRouter.get("/online", verifyToken, redis.getOnlineUsers);
usersRouter.post("/login", usersController.loginPost);
usersRouter.post("/signup", upload.single("file"), usersController.signupPost);
usersRouter.put(
  "/photo",
  verifyToken,
  upload.single("file"),
  profileController.profilePicPut
);

module.exports = usersRouter;
