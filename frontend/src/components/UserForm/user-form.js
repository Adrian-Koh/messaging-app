const BACKEND_DOMAIN = "http://localhost:8000";

export const submitSignup = async (username, password, file, bio) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("file", file);
  formData.append("bio", bio);

  const response = await fetch(BACKEND_DOMAIN + `/users/signup`, {
    method: "POST",
    body: formData,
  });

  const parsed = await response.json();
  console.log("parsed response from signup: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};
