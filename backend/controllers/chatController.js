const { addOnlineUser } = require("../utils/redis");
const jwt = require("jsonwebtoken");

const chatGet = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      // it's ok to not be logged in
      res.json({ message: "not logged in" });
    } else {
      const userId = authData.user.username;

      if (userId) {
        await addOnlineUser(authData.user.username);
      }
      res.json({ message: "successfully logged in" });
    }
  });
};

module.exports = { chatGet };
