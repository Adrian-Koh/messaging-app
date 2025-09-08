const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const profileController = require("../controllers//profileController");
const verifyToken = require("../lib/jwtUtils");

module.exports = usersRouter;
