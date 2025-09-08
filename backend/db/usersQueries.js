const prisma = require("./prismaClient");

async function addUser(username, passwordHash) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUserById(userid) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userid),
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateUserInfo(userid, updateUserInfo) {
  try {
    if (!updateUserInfo) {
      throw new Error("User info is null");
    }
    const username = updateUserInfo.username ? updateUserInfo.username : null;
    const passwordHash = updateUserInfo.passwordHash
      ? updateUserInfo.passwordHash
      : null;
    const photoUrl = updateUserInfo.photoUrl ? updateUserInfo.photoUrl : null;
    const bio = updateUserInfo.bio ? updateUserInfo.bio : null;

    const user = await prisma.user.update({
      where: { id: Number(userid) },
      data: {
        username,
        passwordHash,
        photoUrl,
        bio,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = { addUser, getUserById, getUserByUsername, updateUserInfo };
