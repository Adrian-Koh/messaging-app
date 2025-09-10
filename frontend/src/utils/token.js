import { jwtDecode } from "jwt-decode";

const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  return { authorization: `Bearer ${token}` };
};

const getUsernameFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);

    return decoded.user.username;
  } catch {
    return null;
  }
};

const getProfilePicFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);

    if (!decoded.user.photoUrl) return "";

    return decoded.user.photoUrl;
  } catch {
    return "";
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export {
  getTokenHeader,
  getUsernameFromToken,
  getProfilePicFromToken,
  removeToken,
};
