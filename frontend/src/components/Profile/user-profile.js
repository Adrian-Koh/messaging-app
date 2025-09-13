const BACKEND_DOMAIN = "http://localhost:8000";
import { getTokenHeader } from "../../utils/token";

export const editProfilePic = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(BACKEND_DOMAIN + `/users/photo`, {
    method: "PUT",
    headers: getTokenHeader(),
    body: formData,
  });

  const parsed = await response.json();
  console.log(
    "parsed response from edit profile pic: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  localStorage.setItem("token", parsed.token);
};

export const editBio = async (bio) => {
  const tokenHeader = getTokenHeader();
  const response = await fetch(BACKEND_DOMAIN + `/users/bio`, {
    method: "PUT",
    headers: { ...tokenHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ bio }),
  });

  const parsed = await response.json();
  console.log("parsed response from edit bio: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  localStorage.setItem("token", parsed.token);
};
