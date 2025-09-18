const BACKEND_DOMAIN = "https://messaging-app-04uu.onrender.com/chat";
import { getTokenHeader } from "../../../utils/token";

export const getUserChats = async (otherUserId) => {
  const response = await fetch(BACKEND_DOMAIN + `/${otherUserId}`, {
    headers: getTokenHeader(),
  });

  const parsed = await response.json();
  console.log("parsed response from get user chats: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.chats;
};

export const submitChat = async (otherUserId, message) => {
  const tokenHeader = getTokenHeader();

  const response = await fetch(BACKEND_DOMAIN + `/${otherUserId}`, {
    method: "POST",
    headers: { ...tokenHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const parsed = await response.json();
  console.log("parsed response from post chat: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};
