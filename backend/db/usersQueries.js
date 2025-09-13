const prisma = require("./prismaClient");

async function addUser(username, passwordHash, photoUrl = null, bio = null) {
  try {
    const user = await prisma.user.create({
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
    // const passwordHash = updateUserInfo.passwordHash
    //   ? updateUserInfo.passwordHash
    //   : null;
    const photoUrl = updateUserInfo.photoUrl ? updateUserInfo.photoUrl : null;
    const bio = updateUserInfo.bio ? updateUserInfo.bio : null;

    const user = await prisma.user.update({
      where: { id: Number(userid) },
      data: {
        // passwordHash,
        photoUrl,
        bio,
      },
      select: {
        id: true,
        username: true,
        joinDate: true,
        photoUrl: true,
        bio: true,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addUser,
  getUserById,
  getUserByUsername,
  updateUserInfo,
  getAllUsers,
};
