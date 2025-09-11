const { addOnlineUser } = require("../utils/redis");
const jwt = require("jsonwebtoken");
const chatQueries = require("../db/chatQueries");
const usersQueries = require("../db/usersQueries");

const chatGet = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      // it's ok to not be logged in
      res.json({ message: "not logged in" });
    } else {
      const username = authData.user.username;

      if (username) {
        await addOnlineUser(authData.user.username);
      }
      res.json({ message: "successfully logged in" });
    }
  });
};

const chatWithUserGet = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const { userId } = req.params;
      const loggedInUser = authData.user;

      if (loggedInUser.username) {
        await addOnlineUser(loggedInUser.username);
      }

      const chats = await chatQueries.getChatsBetweenUsers(
        loggedInUser.id,
        userId
      );
      chats.sort((a, b) => a.id - b.id);

      res.json({ chats });
    }
  });
};

const chatPost = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const { userId } = req.params;
      const { message } = req.body;
      const loggedInUser = authData.user;

      if (loggedInUser.username) {
        await addOnlineUser(loggedInUser.username);
      }

      const createdMessage = await chatQueries.addMessage(
        loggedInUser.id,
        userId,
        message
      );

      res.json({ createdMessage });
    }
  });
};

module.exports = { chatGet, chatWithUserGet, chatPost };
