const usersQueries = require("../db/usersQueries");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../utils/supabase");

async function profilePicPut(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      try {
        if (req.file) {
          photoUrl = await uploadFile(authData.user.username, req.file);
        }

        const user = await usersQueries.updateUserInfo(authData.user.id, {
          bio: authData.user.bio,
          photoUrl,
        });

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
      } catch (err) {
        return next(err);
      }
    }
  });
}

async function bioPut(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      try {
        const { bio } = req.body;

        const user = await usersQueries.updateUserInfo(authData.user.id, {
          bio,
          photoUrl: authData.user.photoUrl,
        });

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
      } catch (err) {
        return next(err);
      }
    }
  });
}

module.exports = { profilePicPut, bioPut };
