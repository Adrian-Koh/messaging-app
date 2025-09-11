const BACKEND_DOMAIN = "http://localhost:8000";
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
