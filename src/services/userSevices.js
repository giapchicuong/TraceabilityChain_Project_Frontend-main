import axios from "../setup/axios";

const registerNewUser = (rawData) => {
  const { confirmPassword, ...dataWithoutConfirmPassword } = rawData;
  return axios.post("/register", dataWithoutConfirmPassword);
};

const loginUser = (loginInputs) => {
  const { valueLogin, password } = loginInputs;
  return axios.post("/login", { valueLogin, password });
};
const logoutUser = () => {
  return axios.post("/logout");
};
// USERS
const fetchAllUser = (page, limit) => {
  return axios.get(`/user/read?page=${page}&limit=${limit}`);
};
const createNewUser = (userData) => {
  return axios.post("/user/create", { ...userData });
};
const updateUser = (userData) => {
  return axios.put("/user/update", { ...userData });
};
const deleteUser = (user) => {
  return axios.delete("/user/delete", { data: { id: user.id } });
};

// ACCOUNT
const getUserAccount = () => {
  return axios.get(`/account`);
};

export {
  registerNewUser,
  loginUser,
  getUserAccount,
  fetchAllUser,
  createNewUser,
  deleteUser,
  updateUser,
  logoutUser,
};
