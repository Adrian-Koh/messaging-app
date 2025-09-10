const Redis = require("ioredis");
const redis = new Redis();
// const jwt = require("jsonwebtoken");

const addOnlineUser = async (userId) => {
  await redis.set(`online:${userId}`, Date.now(), "EX", 60);
};

// (req, res, next) => {
//   jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
//     if (err) {
//       next(err);
//     } else {
//       const userId = authData.user.id;
//       if (userId) {
//         // store userId with TTL of 60s

//       }
//       next();
//     }
//   });
// };

const getOnlineUsers = async (req, res, next) => {
  const keys = await redis.keys("online:*");
  const userIds = keys.map((k) => k.replace("online:", ""));
  res.json({ onlineUsers: userIds });
};

module.exports = { addOnlineUser, getOnlineUsers };
