export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// Related to role

export const saveUser = (user) => {
  localStorage.setItem("user", user);
};

export const getUser = () => {
  localStorage.getItem("user");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
