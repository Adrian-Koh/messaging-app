const jwt = require("jsonwebtoken");
const usersQueries = require("../db/usersQueries");
const { uploadFile } = require("../utils/supabase");
const {
  generatePasswordHash,
  validPassword,
} = require("../utils/passwordUtils");
const redis = require("../utils/redis");
require("dotenv").config();

async function usersGet(req, res, next) {
  try {
    const users = await usersQueries.getAllUsers();
    res.json({ users });
  } catch (err) {
    return next(err);
  }
}

async function loginPost(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await usersQueries.getUserByUsername(username);

    if (validPassword(password, user.passwordHash)) {
      await redis.addOnlineUser(user.username); // add online user to redis cache
      delete user.passwordHash; // remove passwordHash from token sent to user
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
  } catch (err) {
    return next(err);
  }
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

    const user = await usersQueries.addUser(
      username,
      passwordHash,
      photoUrl,
      bio
    );
    res.json({
      message: "signup success",
      user,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { usersGet, loginPost, signupPost };
