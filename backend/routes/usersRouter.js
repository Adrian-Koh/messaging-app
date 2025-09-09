const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const profileController = require("../controllers/profileController");
const verifyToken = require("../utils/jwtUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

usersRouter.post("/login", usersController.loginPost);
usersRouter.post("/signup", upload.single("file"), usersController.signupPost);

usersRouter.put(
  "/profile",
  upload.single("file"),
  profileController.editProfile
);

module.exports = usersRouter;
