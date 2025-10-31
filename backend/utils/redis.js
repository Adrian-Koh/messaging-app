const { createClient } = require("redis");
require("dotenv").config();

let client = null;
async function connectRedis() {
  client = await createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
    },
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
}

const addOnlineUser = async (username) => {
  // store userId with TTL of 60s
  if (!client) await connectRedis();
  await client.set(`online:${username}`, Date.now(), { EX: 60 });
};

const getOnlineUsers = async (req, res, next) => {
  if (!client) await connectRedis();
  const keys = await client.keys("online:*");
  const usernames = keys.map((k) => k.replace("online:", ""));
  res.json({ onlineUsers: usernames });
};

module.exports = { addOnlineUser, getOnlineUsers };
