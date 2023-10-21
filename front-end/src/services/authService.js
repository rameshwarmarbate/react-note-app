// Function to set a token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to remove a token
export const removeToken = () => {
  // Clear the token from localStorage or a cookie
  localStorage.removeItem("token");
};

// Function to get the current user's token (if logged in)
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to check if a user is logged in
export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};
