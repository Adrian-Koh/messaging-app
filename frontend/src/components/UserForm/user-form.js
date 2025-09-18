const BACKEND_DOMAIN = "https://messaging-app-04uu.onrender.com";

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

export const submitLogin = async (username, password) => {
  const response = await fetch(BACKEND_DOMAIN + `/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const parsed = await response.json();
  console.log("parsed response from login: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  localStorage.setItem("token", parsed.token);
};
