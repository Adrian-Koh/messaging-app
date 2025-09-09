const jwt = require("jsonwebtoken");
const usersQueries = require("../db/usersQueries");
const { uploadFile } = require("../utils/supabase");
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
              return next(err);
            }
            res.json({ token });
          }
        );
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      return next(err);
    });
}

async function signupPost(req, res, next) {
  try {
    const { username, password, bio } = req.body;

    // reject if username already exists to prevent uploading redundant profile pic
    const existingUser = await usersQueries.getUserByUsername(username);
    if (existingUser)
      throw new Error(`The username ${username} has already been taken.`);

    const passwordHash = generatePasswordHash(password);

    let photoUrl = null;
    if (req.file) {
      photoUrl = await uploadFile(username, req.file);
    }

    usersQueries
      .addUser(username, passwordHash, photoUrl, bio)
      .then((user) => {
        res.json({
          message: "signup success",
          user,
        });
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
}

module.exports = { loginPost, signupPost };
