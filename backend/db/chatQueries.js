const prisma = require("./prismaClient");

const getChatsBetweenUsers = async (userOneId, userTwoId) => {
  try {
    const chats = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [
              { senderId: Number(userOneId) },
              { receiverId: Number(userTwoId) },
            ],
          },
          {
            AND: [
              { receiverId: Number(userOneId) },
              { senderId: Number(userTwoId) },
            ],
          },
        ],
      },
    });
    return chats;
  } catch (err) {
    throw err;
  }
};

const addMessage = async (senderId, receiverId, message) => {
  try {
    const createdMessage = await prisma.message.create({
      data: {
        senderId: Number(senderId),
        receiverId: Number(receiverId),
        text: message,
      },
    });
    return createdMessage;
  } catch (err) {
    throw err;
  }
};

module.exports = { getChatsBetweenUsers, addMessage };
