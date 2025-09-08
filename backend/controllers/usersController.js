const jwt = require("jsonwebtoken");
const usersQueries = require("../db/usersQueries");
const {
  generatePasswordHash,
  validPassword,
} = require("../utils/passwordUtils");
require("dotenv").config();

function loginPost(req, res, next) {
  const { username, password } = req.body;
  usersQueries
    .getUserByUsername(username)
    .then((user) => {
      if (validPassword(password, user.passwordHash)) {
        jwt.sign(
          { user },
          process.env.SECRET_KEY,
          { expiresIn: "7d" },
          (err, token) => {
            if (err) {
              next(err);
            }
            res.json({ token });
          }
        );
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      next(err);
    });
}

async function signupPost(req, res, next) {
  const { username, password } = req.body;
  const passwordHash = generatePasswordHash(password);
  usersQueries
    .addUser(username, passwordHash)
    .then((user) => {
      res.json({
        message: "signup success",
        user,
      });
      res.redirect("/login");
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { loginPost, signupPost };
