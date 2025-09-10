const Redis = require("ioredis");
const redis = new Redis();

const addOnlineUser = async (username) => {
  // store userId with TTL of 60s
  await redis.set(`online:${username}`, Date.now(), "EX", 60);
};

const getOnlineUsers = async (req, res, next) => {
  const keys = await redis.keys("online:*");
  const usernames = keys.map((k) => k.replace("online:", ""));
  res.json({ onlineUsers: usernames });
};

module.exports = { addOnlineUser, getOnlineUsers };
