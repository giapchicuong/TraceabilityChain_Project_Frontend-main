import axios from "../setup/axios";

//ROLES
const fetchAllRole = () => {
  return axios.get("/role/read");
};
const createNewRole = (roleData) => {
  return axios.post("/role/create", { ...roleData });
};
const updateRole = (roleData) => {
  return axios.put("/role/update", { ...roleData });
};
const deleteRole = (role) => {
  return axios.delete("/role/delete", { data: { id: role.id } });
};

const fetchRoleByGroup = (groupId) => {
  return axios.get(`/role/by-group/${groupId}`);
};
const assignRoleToGroup = (data) => {
  return axios.post("/role/assign-to-group", {...data});
};
export {
  fetchAllRole,
  createNewRole,
  updateRole,
  deleteRole,
  fetchRoleByGroup,
  assignRoleToGroup,
};
