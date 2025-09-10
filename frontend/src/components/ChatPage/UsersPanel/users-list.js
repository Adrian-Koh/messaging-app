const BACKEND_DOMAIN = "http://localhost:8000";
import { getTokenHeader } from "../../../utils/token";

export const getAllUsers = async () => {
  const response = await fetch(BACKEND_DOMAIN + "/users", {
    headers: getTokenHeader(),
  });

  const parsed = await response.json();
  console.log("parsed response from get all users: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.users;
};

export const getAllOnlineUsers = async () => {
  const response = await fetch(BACKEND_DOMAIN + "/users/online", {
    headers: getTokenHeader(),
  });

  const parsed = await response.json();
  console.log(
    "parsed response from get all online users: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.onlineUsers;
};
