const usersQueries = require("../db/usersQueries");
const jwt = require("jsonwebtoken");

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
          photoUrl,
        });

        res.json({ user });
      } catch (err) {
        return next(err);
      }
    }
  });
}

module.exports = { profilePicPut };
